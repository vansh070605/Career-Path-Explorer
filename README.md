# 🤖 **CAPE — Career Path Explorer**

<p align="center">
  <img src="./assets/hero.gif" alt="CAPE Hero" width="700"/>
</p>

> A short, **explainable career recommendation engine** that maps student profiles (skills, education, interests) to **ranked career suggestions** using a production-ready ML pipeline.

---

## 🚀 **Highlights**

✅ Explainable **Random Forest model** with feature importance
<br>
✅ **End-to-end pipeline**: data → preprocessing → features → training → inference
<br>
✅ **Top-N career recommendations** with confidence scores
<br>
✅ Easy to run locally (**Windows instructions included**)

---

## 📁 **Project Layout**

```
.vscode/        - editor settings
backend/        - Python backend, datasets and model artifacts
  ├── datasets/       - CSV datasets used by backend
  ├── models/         - saved models & encoders (joblib / pkl)
  ├── merge_colleges.py
  ├── check_model_shapes.py
  ├── app.py
  └── requirements.txt
frontend/       - web client (Vite/React)
  ├── public/
  ├── src/
  ├── package.json
  └── README.md
quiz/           - quiz micro-app and quiz-specific models
  ├── models/         - emb_model, tfidf_vectorizer.joblib, voting_clf.joblib, label_encoder.joblib
  ├── app.py
  └── career_quiz_dataset_*.csv
screenshots/    - images used in README (Dashboard.png, Quiz.png, etc.)
notebooks/      - experiments and EDA notebooks (e.g., career.ipynb)
models/         - additional persisted model artifacts (if any)
requirements.txt - project-level Python deps (root or backend)
README.md       - this file
LICENSE         - project license (MIT)
```

---

## 🖼️ **Screenshots**

📌 Add project screenshots in `./assets/screenshots/` and reference them here.

### Example Embeds

![Dashboard](./screenshots/Dashboard.png)
*Dashboard: top career recommendations and confidence scores.*

---

### 📊 Side-by-Side Thumbnails

<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:flex-start;">

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/Dashboard.png">
      <img src="./screenshots/Dashboard.png" alt="Dashboard" style="width:100%;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Dashboard — Top career recommendations & confidence scores</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/CollegeExplorer.png">
      <img src="./screenshots/CollegeExplorer.png" alt="College Explorer" style="width:100%;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">College Explorer — Explore programs and fit</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/Quiz.png">
      <img src="./screenshots/Quiz.png" alt="Quiz" style="width:100%;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Quiz — Skill & interest assessment</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/SkillBuilder.png">
      <img src="./screenshots/SkillBuilder.png" alt="Skill Builder" style="width:100%;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Skill Builder — Learning path suggestions</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/Visualizer.png">
      <img src="./screenshots/Visualizer.png" alt="Visualizer" style="width:100%;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Visualizer — Data insights & feature importance</figcaption>
  </figure>

  <figure style="margin:0;text-align:center;width:360px;">
    <a href="./screenshots/TimelineTracker.png">
      <img src="./screenshots/TimelineTracker.png" alt="Timeline Tracker" style="width:100%;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.10);" />
    </a>
    <figcaption style="font-size:13px;color:#444;margin-top:8px;">Timeline Tracker — Progress & milestones</figcaption>
  </figure>
</div>

> ⚡ **Tips:**
>
> * Optimize images for web (< 2MB each).
> * Use **16:9 aspect ratio** (e.g., 1200×675).

---

## ⚙️ **Quickstart (Windows)**

```bash
# 1. Clone the repo
git clone https://github.com/<your-org>/Career-Path-Explorer.git

# 2. Create venv and activate
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# 3. Install dependencies
pip install -r requirements.txt

# 4. Prepare data and train
python -m src.data.preprocess data/raw data/processed
python -m src.models.trainer --config configs/train.yaml
```

---

## 🔬 **Example Inference**

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

## 📈 **Evaluation**

Tracks: **accuracy, precision, recall, F1-score**
👉 Use `notebooks/` for **visualizations** and **error analysis**.

---

## ✨ **Animated README Asset**

Add a short looping GIF at `./assets/hero.gif` (< 2MB).
Options:

* Screen recording of model demo → GIF
* Animated SVG/GIF you own

---

## 🤝 **Contributing**

* Open issues for bugs/features
* PRs: follow code style & add tests
* See `CONTRIBUTING.md` (create one if missing)

---

## 📜 **License**

📝 MIT — see `LICENSE`
