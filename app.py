import warnings
from sklearn.exceptions import InconsistentVersionWarning

warnings.filterwarnings("ignore", category=InconsistentVersionWarning)


import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load model & encoder once at startup
with open("career_recommendation_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("career_label_encoder.pkl", "rb") as f:
    le_cluster = pickle.load(f)

@app.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    # Convert input into same feature format as training (X)
    # For now, just dummy response
    X_input = ...  # preprocess data into correct shape
    prediction = model.predict([X_input])
    career = le_cluster.inverse_transform(prediction)[0]
    return jsonify({"recommended_career": career})

if __name__ == "__main__":
    app.run(debug=True)
