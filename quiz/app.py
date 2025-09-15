from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import pickle
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer

app = Flask(__name__)
CORS(app)

# Load the simple quiz dataset (used by the old fallback matching)
try:
    df = pd.read_csv("career_quiz_dataset_1200.csv")
except FileNotFoundError:
    print("Dataset not found. Please ensure 'career_quiz_dataset_1200.csv' is in the project folder.")
    df = pd.DataFrame()

# Try to load the trained model + label encoder + build feature columns from the training CSV
model = None
le_cluster = None
le_edu = None
mlb_skills = None
mlb_interests = None
feature_columns = []

try:
    with open("career_recommendation_model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("career_label_encoder.pkl", "rb") as f:
        le_cluster = pickle.load(f)

    # load training dataset to reconstruct feature columns & encoders
    train_df = pd.read_csv("career_dataset.csv")
    # drop unused cols
    train_df = train_df.drop(columns=[c for c in ["CandidateID", "Name", "Recommendation_Score", "Recommended_Career"] if c in train_df.columns], errors="ignore")

    # Fit skill & interest binarizers on training data (prefix columns to avoid collisions)
    mlb_skills = MultiLabelBinarizer()
    skills_series = train_df["Skills"].fillna("").astype(str).str.split(";")
    skills_mat = mlb_skills.fit_transform(skills_series)
    skill_cols = [f"skill_{s}" for s in mlb_skills.classes_]

    mlb_interests = MultiLabelBinarizer()
    interests_series = train_df["Interests"].fillna("").astype(str).str.split(";")
    interests_mat = mlb_interests.fit_transform(interests_series)
    interest_cols = [f"interest_{s}" for s in mlb_interests.classes_]

    # Build a sample processed DataFrame to learn final feature column order
    skills_df = pd.DataFrame(skills_mat, columns=skill_cols, index=train_df.index)
    interests_df = pd.DataFrame(interests_mat, columns=interest_cols, index=train_df.index)
    proc = train_df.drop(columns=["Skills", "Interests"], errors="ignore").reset_index(drop=True)
    proc = pd.concat([proc.reset_index(drop=True), skills_df.reset_index(drop=True), interests_df.reset_index(drop=True)], axis=1).fillna(0)

    # Encode education with LabelEncoder (fit on training)
    le_edu = LabelEncoder()
    if "Education" in proc.columns:
        proc["Education"] = le_edu.fit_transform(proc["Education"].astype(str))
    else:
        # if education missing in training set, create a dummy encoder
        le_edu.fit(["unknown"])

    # final feature columns (drop target if exists)
    feature_columns = [c for c in proc.columns.tolist() if c not in ("Recommended_Career", "Career_Cluster", "career_cluster", "Recommended_Career")]
    print("Loaded model and prepared feature columns:", len(feature_columns))
except Exception as e:
    print("Model or preprocessing artifacts not loaded:", e)
    model = None

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Career Quiz API is running!"})

@app.route("/recommend", methods=["POST"])
def recommend():
    if model is not None and len(feature_columns) > 0:
        user_input = request.json or {}
        # Build a single-row feature dict initialized with zeros
        row = {col: 0 for col in feature_columns}

        # Age (if present)
        if "Age" in user_input and "Age" in row:
            try:
                row["Age"] = float(user_input.get("Age", 0))
            except:
                row["Age"] = 0

        # Education (map using the fitted encoder)
        if "Education" in user_input and "Education" in feature_columns:
            try:
                edu_val = str(user_input.get("Education", "")).strip()
                row["Education"] = int(le_edu.transform([edu_val])[0]) if edu_val != "" else 0
            except:
                row["Education"] = 0

        # Skills and interests: accept list or semicolon-separated string
        skills = user_input.get("skills") or user_input.get("Skills") or user_input.get("Q3_Strongest_Skills")
        if isinstance(skills, str):
            skills = [s.strip() for s in skills.split(";") if s.strip()]
        if skills is None:
            skills = []

        interests = user_input.get("interests") or user_input.get("Interests") or user_input.get("Q2_Enjoyed_Activities")
        if isinstance(interests, str):
            interests = [s.strip() for s in interests.split(";") if s.strip()]
        if interests is None:
            interests = []

        # mark skill and interest columns
        for s in skills:
            col = f"skill_{s}"
            if col in row:
                row[col] = 1
        for it in interests:
            col = f"interest_{it}"
            if col in row:
                row[col] = 1

        # Create dataframe matching training column order
        X_user = pd.DataFrame([row], columns=feature_columns).fillna(0)

        # Predict
        try:
            pred = model.predict(X_user)[0]
            label = le_cluster.inverse_transform([int(pred)])[0] if le_cluster is not None else str(pred)
            score = None
            if hasattr(model, "predict_proba"):
                proba = model.predict_proba(X_user)
                # For voting/hard classifiers predict_proba may not be available; handle gracefully
                try:
                    score = float(proba.max())
                except:
                    score = None

            response = {
                "Recommended_Career": label,
                "Recommendation_Score": round(score, 4) if score is not None else None,
                "raw_prediction": int(pred)
            }
            return jsonify(response)
        except Exception as e:
            return jsonify({"error": f"prediction failed: {e}"}), 500

    # Fallback: original dataset matching (line-based exact match)
    if df.empty:
        return jsonify({"error": "Dataset not loaded and model unavailable."}), 500

    user_input = request.json
    if not user_input:
        return jsonify({"error": "No input data provided."}), 400

    best_match = None
    max_score = -1
    # List of question columns
    question_cols = [col for col in df.columns if col.startswith("Q")]

    for _, row_df in df.iterrows():
        score = 0
        total = 0
        for q in question_cols:
            user_answer = str(user_input.get(q, "")).strip().lower()
            row_answer = str(row_df[q]).strip().lower()
            if user_answer and row_answer and user_answer == row_answer:
                score += 1
            total += 1
        similarity = score / total if total > 0 else 0
        if similarity > max_score:
            max_score = similarity
            best_match = row_df

    if best_match is not None:
        response = {
            "Recommended_Course": best_match.get("Recommended_Course", "N/A"),
            "Recommended_Career": best_match.get("Recommended_Career", "N/A"),
            "Recommended_College_Type": best_match.get("Recommended_College_Type", "N/A"),
            "Recommendation_Score": round(max_score, 2)
        }
        return jsonify(response)
    else:
        return jsonify({"error": "No recommendation found"}), 404

if __name__ == "__main__":
    app.run(debug=True)