# 🤖 CAPE — Career Path Explorer

![hero](./assets/hero.gif)

Short, explainable career recommendation engine that maps student profiles (skills, education, interests) to ranked career suggestions using a production-ready ML pipeline.

---

## 🚀 Highlights
- Explainable Random Forest model with feature importance.
- End-to-end pipeline: data → preprocessing → features → training → inference.
- Top-N career recommendations with confidence scores.
- Easy to run locally (Windows instructions included).

---

## 📁 Project layout
- data/ — raw and processed datasets
- notebooks/ — EDA and experiments
- src/
  - data/ — preprocessing utilities
  - features/ — feature builders
  - models/ — training & inference code
  - utils/ — helpers
- models/ — saved model artifacts
- scripts/ — convenience scripts

---

## 🖼️ Screenshots
Add project screenshots to ./assets/screenshots/ and reference them here. Recommended images:
- dashboard.png — main UI / recommendation view
- pipeline.png — pipeline diagram or training metrics
- demo.gif — short demo (optional)

Example embeds:

![Dashboard](./assets/screenshots/dashboard.png)
*Dashboard: top career recommendations and confidence scores.*

![Pipeline](./assets/screenshots/pipeline.png)
*Pipeline: preprocessing → features → training → inference.*

If you prefer side-by-side thumbnails, use HTML for layout:

<p float="left">
  <img src="./screenshots/dashboard.png" width="360" />
  <img src="./screenshots/CollegeExplorer.png" width="360" />
  <img src="./screenshots/Quiz.png" width="360" />
  <img src="./screenshots/SkillBuilder.png" width="360" />
  <img src="./screenshots/Visualizer.png" width="360" />
  <img src="./screenshots/TimelineTracker.png" width="360" />
</p>

Notes:
- Optimize images for web (keep each < 1–2MB).
- Use 16:9 aspect ratio for consistency (e.g., 1200×675 or 800×450).

---

## ⚙️ Quickstart (Windows)
1. Clone:
   git clone https://github.com/<your-org>/Career-Path-Explorer.git
2. Create venv and activate (PowerShell):
   ```
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
3. Install:
   ```
   pip install -r requirements.txt
   ```
4. Prepare data and train:
   ```
   python -m src.data.preprocess data/raw data/processed
   python -m src.models.trainer --config configs/train.yaml
   ```

---

## 🔬 Example inference
```python
# filepath: example_inference.py
import pandas as pd
from joblib import load

model = load("models/cape_rf.joblib")
le_career = load("models/le_career.joblib")

new_candidate = {
    "age": 22,
    "education": "Bachelors",
    "skills": ["python","sql","data-visualization"],
    "interests": ["ml","analytics"]
}
df = pd.DataFrame([new_candidate])
pred = model.predict(df)
print("Recommendation:", le_career.inverse_transform(pred)[0])
```

---

## 📈 Evaluation
Tracks accuracy, precision, recall, F1. Use notebooks/ for visualizations and error analysis.

---

## ✨ Animated README asset
Add a short looping GIF at ./assets/hero.gif (optimized < 2MB) for the animated header. Example sources:
- Create a screen recording of model demo and convert to GIF.
- Use an animated SVG or GIF that you own.

---

## Contributing
- Open issues for bugs/features.
- PRs: follow code style and add tests for new behavior.
- See CONTRIBUTING.md (create one if missing).

---

## License
MIT — see LICENSE.

---
