# 🤖 CAPE Model: Career Recommendation Engine

## 🚀 Overview
> CAPE uses a machine learning model to help students discover the best career paths based on their skills, interests, and education. The model analyzes your profile and suggests careers that fit you best! :mag:

***

## 🧠 How the Model Works
- **Input Features:**
  - Age :calendar:
  - Education :mortar_board:
  - Skills :computer: :paintbrush: :bar_chart:
  - Interests :bulb: :books: :rocket:
- **Preprocessing:**
  - Categorical features (like education, skills, interests) are encoded :key:.
  - Numeric features are scaled :straight_ruler:.
- **Model:**
  - Uses a Random Forest Classifier :deciduous_tree: for robust, interpretable predictions.
  - Each tree votes for a career, and the most popular choice wins :trophy:.
- **Output:**
  - Top career recommendations :star2:
  - Confidence scores :chart_with_upwards_trend:

***

## 📊 Evaluation Metrics
- **Accuracy** :dart:
- **Precision** :white_check_mark:
- **Recall** :recycle:
- **F1 Score** :medal_sports:

***

## 🛠️ Example Usage
```python
# Predict career for a new candidate
new_df = pd.DataFrame([new_candidate])
pred = model.predict(new_df)
print('Recommended Career:', le_career.inverse_transform(pred)[0])
```

***

## 🌟 Why Random Forest?
- Handles many features :package:
- Robust to missing data :umbrella:
- Explains which skills or interests matter most :bulb:

***

## 💡 Next Steps
- Try other models (e.g., Gradient Boosting :zap:)
- Tune hyperparameters for better results :gear:
- Use top-N recommendations for more options :sparkles:

***

## 🙌 Contributing
Feel free to open issues or pull requests! :raised_hands:

***

> "CAPE helps you find your path—one prediction at a time!" :compass:
//.\venv\Scripts\Activate.ps1
