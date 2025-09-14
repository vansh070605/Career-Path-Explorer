from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load dataset
try:
    df = pd.read_csv("career_quiz_dataset_1200.csv")
except FileNotFoundError:
    print("Dataset not found. Please ensure 'career_quiz_dataset_1200.csv' is in the project folder.")
    df = pd.DataFrame()  # Empty dataframe to avoid crash

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Career Quiz API is running!"})


@app.route("/recommend", methods=["POST"])
def recommend():
    if df.empty:
        return jsonify({"error": "Dataset not loaded."}), 500

    user_input = request.json
    if not user_input:
        return jsonify({"error": "No input data provided."}), 400

    best_match = None
    max_score = -1

    # List of question columns
    question_cols = [col for col in df.columns if col.startswith("Q")]

    # Iterate dataset to find best match
    for _, row in df.iterrows():
        score = 0
        total = 0

        for q in question_cols:
            user_answer = str(user_input.get(q, "")).strip().lower()
            row_answer = str(row[q]).strip().lower()

            if user_answer and row_answer and user_answer == row_answer:
                score += 1
            total += 1

        similarity = score / total if total > 0 else 0

        if similarity > max_score:
            max_score = similarity
            best_match = row

    if best_match is not None:
        response = {
            "Recommended_Course": best_match.get("Recommended_Course", "N/A"),
            "Recommended_Career": best_match.get("Recommended_Career", "N/A"),
            "Recommended_College_Type": best_match.get("Recommended_College_Type", "N/A"),
            "Recommendation_Score": round(max_score, 2)  # similarity score (0-1)
        }
        return jsonify(response)
    else:
        return jsonify({"error": "No recommendation found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
