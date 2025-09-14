import React, { useState } from "react";
import "./App.css";

export default function CareerCard({ row }) {
  const [showModal, setShowModal] = useState(false);
  const r = row || {};
  const rawScore = parseFloat(r.Recommendation_Score);
  const score = isNaN(rawScore) ? 0 : Math.max(0, Math.min(1, rawScore));
  const scorePercent = Math.round(score * 100);

  return (
    <>
      <article className="career-card">
        <div>
          <h2>{r.Recommended_Career || "Unknown Career"}</h2>
          <div className="subtitle">
            {(r.Recommended_Course || "—")} {r.Recommended_College_Type ? `• ${r.Recommended_College_Type}` : ""}
          </div>

          <div className="score-bar">
            <span className="label">Score</span>
            <div className="bar">
              <div className="fill" style={{ width: `${scorePercent}%` }} />
            </div>
            <span className="percentage">{scorePercent}%</span>
          </div>

          <ul>
            <li title="Your favorite subjects">{r.Q1_Favorite_Subjects || "—"}</li>
            <li title="Your strongest skills">{r.Q3_Strongest_Skills || "—"}</li>
            <li title="Your work style">{r.Q4_Work_Style || "—"}</li>
            <li title="Preferred location">{r.Q7_Location_Preference || "—"}</li>
          </ul>
        </div>

        <button type="button" className="view-btn" onClick={() => setShowModal(true)}>
          View Details
        </button>
      </article>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{r.Recommended_Career}</h2>
            <p><strong>Roadmap:</strong> {r.Q8_Roadmap || "Step-by-step plan not available."}</p>
            <p><strong>Salary Expectations:</strong> {r.Q9_Salary_Expectations || "Data not available."}</p>
            <p><strong>Growth Trends:</strong> {r.Q10_Growth_Trends || "Data not available."}</p>
            <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
