# 🤖 CAPE — Career Path Explorer

<p align="center">
  <img src="./assets/hero.gif" alt="CAPE Hero" width="760" style="border-radius:12px;box-shadow:0 8px 30px rgba(11,22,39,0.12)"/>
</p>

<p align="center">
  <a href="#"><img alt="Python" src="https://img.shields.io/badge/python-3.10%2B-blue"/></a>
  <a href="#"><img alt="License" src="https://img.shields.io/badge/license-MIT-green"/></a>
  <a href="#"><img alt="Status" src="https://img.shields.io/badge/status-Prototype-orange"/></a>
</p>

A compact, explainable career recommendation engine that maps student profiles (skills, education, interests) to ranked career suggestions. Focused on reproducible ML pipelines and an interactive frontend for exploration.

---

## Contents
- [Highlights](#highlights)
- [Quick preview](#quick-preview)
- [Project layout](#project-layout)
- [Quickstart (Windows)](#quickstart-windows)
- [Contributing & License](#contributing--license)

---

## 🚀 Highlights
- Explainable Random Forest with feature importance and visualizer.
- End-to-end pipeline: raw data → preprocessing → features → training → inference.
- Quiz micro-app for candidate profiling and personalized recommendations.
- Web frontend (Vite/React) for interactive exploration.

---

## 🖼️ Quick preview

<div align="center" style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;">
  <figure style="width:320px;margin:0;text-align:center;">
    <a href="./screenshots/Dashboard.png" style="display:block;">
      <img src="./screenshots/Dashboard.png" alt="Dashboard" style="width:100%;border-radius:10px;border:1px solid #f0f0f0;box-shadow:0 10px 30px rgba(12, 20, 32, 0.08);transition:transform .15s ease" />
    </a>
    <figcaption style="font-size:13px;color:#555;margin-top:8px;">Dashboard — Top career recommendations</figcaption>
  </figure>

  <figure style="width:320px;margin:0;text-align:center;">
    <a href="./screenshots/Quiz.png" style="display:block;">
      <img src="./screenshots/Quiz.png" alt="Quiz" style="width:100%;border-radius:10px;border:1px solid #f0f0f0;box-shadow:0 10px 30px rgba(12, 20, 32, 0.08);transition:transform .15s ease" />
    </a>
    <figcaption style="font-size:13px;color:#555;margin-top:8px;">Quiz — Skill & interest assessment</figcaption>
  </figure>

  <figure style="width:320px;margin:0;text-align:center;">
    <a href="./screenshots/Visualizer.png" style="display:block;">
      <img src="./screenshots/Visualizer.png" alt="Visualizer" style="width:100%;border-radius:10px;border:1px solid #f0f0f0;box-shadow:0 10px 30px rgba(12, 20, 32, 0.08);transition:transform .15s ease" />
    </a>
    <figcaption style="font-size:13px;color:#555;margin-top:8px;">Visualizer — Feature importance & insights</figcaption>
  </figure>
</div>

*Tip: click any thumbnail to view the full-size image.*

---

## 📁 Project layout

```
.vscode/                     - editor settings
backend/                     - Python backend, datasets and model artifacts
  ├── datasets/              - many CSVs (College.csv, Engineering.csv, ... )
  ├── app.py                 - backend app / demo scripts
  ├── merge_colleges.py
  ├── check_model_shapes.py
  ├── app.db                 - small demo DB (if present)
  ├── career_1200_model.pkl
  ├── quiz_label_encoder.pkl
  ├── quiz_vectorizer.pkl
  └── requirements.txt
frontend/                    - Vite/React app (UI)
  ├── public/
  ├── src/
  ├── package.json
  └── README.md
quiz/                        - quiz micro-app & quiz-specific models
  ├── models/                - emb_model, tfidf_vectorizer.joblib, voting_clf.joblib, label_encoder.joblib
  ├── app.py
  └── career_quiz_dataset_1200.csv
screenshots/                 - images used in README (Dashboard.png, Quiz.png, Visualizer.png, ...)
notebooks/                   - EDA, experiments and visualizations
README.md                    - this file
requirements.txt             - root or backend Python deps
LICENSE                      - MIT
```

(Structure reflects current workspace — files like career_model.pkl, scaler.pkl, colleges.csv are in root/backend as shown.)

---

## ⚙️ Quickstart (Windows)
1. Clone:
   git clone https://github.com/<your-org>/Career-Path-Explorer.git
2. Create & activate venv (PowerShell):
   ```
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
3. Install:
   ```
   pip install -r backend/requirements.txt
   ```
4. Run backend demo:
   ```
   python backend/app.py
   ```
5. Run frontend (from frontend/):
   ```
   cd frontend
   npm install
   npm run dev
   ```

---

## 🤝 Contributing & License
- Contributions welcome — open issues or PRs.
- Follow code style and add tests for new features.
- Licensed under MIT — see LICENSE.

---
