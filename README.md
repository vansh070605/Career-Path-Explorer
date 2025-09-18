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

![Dashboard](./assets/screenshots/Dashboard.png)
*Dashboard: top career recommendations and confidence scores.*

If you prefer side-by-side thumbnails, use HTML for layout:

<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:flex-start;">
  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/Dashboard.png" style="display:block;text-decoration:none;color:inherit;">
      <img src="./screenshots/Dashboard.png" alt="Dashboard" style="width:100%;height:auto;border-radius:8px;border:1px solid #e6e6e6;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Dashboard — Top career recommendations & confidence scores</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/CollegeExplorer.png" style="display:block;text-decoration:none;color:inherit;">
      <img src="./screenshots/CollegeExplorer.png" alt="College Explorer" style="width:100%;height:auto;border-radius:8px;border:1px solid #e6e6e6;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">College Explorer — Explore programs and fit</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/Quiz.png" style="display:block;text-decoration:none;color:inherit;">
      <img src="./screenshots/Quiz.png" alt="Quiz" style="width:100%;height:auto;border-radius:8px;border:1px solid #e6e6e6;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Quiz — Skill & interest assessment</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/SkillBuilder.png" style="display:block;text-decoration:none;color:inherit;">
      <img src="./screenshots/SkillBuilder.png" alt="Skill Builder" style="width:100%;height:auto;border-radius:8px;border:1px solid #e6e6e6;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Skill Builder — Learning path suggestions</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/Visualizer.png" style="display:block;text-decoration:none;color:inherit;">
      <img src="./screenshots/Visualizer.png" alt="Visualizer" style="width:100%;height:auto;border-radius:8px;border:1px solid #e6e6e6;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Visualizer — Data insights & feature importance</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/TimelineTracker.png" style="display:block;text-decoration:none;color:inherit;">
      <img src="./screenshots/TimelineTracker.png" alt="Timeline Tracker" style="width:100%;height:auto;border-radius:8px;border:1px solid #e6e6e6;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Timeline Tracker — Progress & milestones</figcaption>
  </figure>
</div>

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
