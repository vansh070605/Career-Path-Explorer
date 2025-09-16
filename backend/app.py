from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Load CSV once
try:
    colleges_df = pd.read_csv("colleges.csv")
    print("✅ colleges.csv loaded successfully!")
except FileNotFoundError:
    print("❌ colleges.csv not found!")
    colleges_df = pd.DataFrame()

@app.route("/api/states", methods=["GET"])
def get_states():
    if colleges_df.empty or "state" not in colleges_df.columns:
        return jsonify([]), 200
    states = sorted(colleges_df["state"].dropna().unique().tolist())
    return jsonify(states), 200

@app.route("/api/recommend", methods=["POST"])
def recommend():
    if colleges_df.empty:
        return jsonify({"error": "No college data available"}), 500

    data = request.get_json()
    if not data or "state" not in data:
        return jsonify({"error": "Missing state parameter"}), 400

    state = data.get("state")
    state_colleges = colleges_df[colleges_df["state"].str.lower() == state.lower()]

    if state_colleges.empty:
        return jsonify([]), 200

    def get_best_ranking(rankings):
        valid = [r for r in rankings if pd.notnull(r)]
        return min(valid) if valid else np.inf

    # Build aggregation dict dynamically
    agg_dict = {
        'city': ('city', 'first'),
        'rankings': ('ranking', list),
        'fields': ('field', list),
        'scores': ('score', list)
    }

    if 'website' in state_colleges.columns:  # ✅ only add if exists
        agg_dict['website'] = ('website', 'first')

    grouped = state_colleges.groupby('college_name').agg(**agg_dict).reset_index()
    grouped['best_ranking'] = grouped['rankings'].apply(get_best_ranking)
    grouped.sort_values('best_ranking', inplace=True)

    colleges_list = []
    for _, college in grouped.iterrows():
        college_info = {
            "college_name": college["college_name"],
            "city": college["city"],
            "website": college["website"] if "website" in grouped.columns else None,  # ✅ safe access
            "rankings": [
                {
                    "field": college['fields'][i],
                    "ranking": None if pd.isna(college['rankings'][i]) else int(college['rankings'][i]),
                    "score": None if pd.isna(college['scores'][i]) else float(college['scores'][i])
                } for i in range(len(college['fields']))
            ]
        }
        colleges_list.append(college_info)

    return jsonify(colleges_list), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
