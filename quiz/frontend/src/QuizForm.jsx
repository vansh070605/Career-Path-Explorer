import React, { useState } from "react";
import "./QuizForm.css";

function QuizForm() {
  const [formData, setFormData] = useState({
    Q1_Favorite_Subjects: "",
    Q2_Enjoyed_Activities: "",
    Q3_Strongest_Skills: "",
    Q4_Work_Style: "",
    Q5_Workplace_Preference: "",
    Q6_Exam_Readiness: "",
    Q7_Location_Preference: "",
    Q8_Career_Values: "",
    Q9_LongTerm_Goal: "",
    Q10_Academic_Background: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error fetching recommendation:", err);
    }
  };

  // Options for each question
  const options = {
    Q1_Favorite_Subjects: ["Math", "Science", "Arts", "Commerce", "Others"],
    Q2_Enjoyed_Activities: ["Sports", "Reading", "Coding", "Music", "Volunteering"],
    Q3_Strongest_Skills: ["Problem Solving", "Communication", "Leadership", "Creativity", "Analytical Thinking"],
    Q4_Work_Style: ["Team Player", "Independent", "Flexible", "Structured"],
    Q5_Workplace_Preference: ["Office", "Remote", "Hybrid", "Field Work"],
    Q6_Exam_Readiness: ["Very Confident", "Confident", "Somewhat Confident", "Not Confident"],
    Q7_Location_Preference: ["Urban", "Suburban", "Rural", "No Preference"],
    Q8_Career_Values: ["Money", "Impact", "Creativity", "Stability", "Growth"],
    Q9_LongTerm_Goal: ["Entrepreneurship", "Research", "Corporate Career", "Freelancing", "Public Service"],
    Q10_Academic_Background: ["Science", "Arts", "Commerce", "Vocational"]
  };

  return (
    <div className="quiz-container">
      <h1>Career Quiz</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((q, idx) => (
          <div key={idx}>
            <label>{q.replace(/_/g, " ")}:</label>
            <select
              name={q}
              value={formData[q]}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {options[q].map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Get Recommendation</button>
      </form>

      {result && (
        <div className="result">
          <h2>Recommendation</h2>
          <p><strong>Course:</strong> {result.Recommended_Course}</p>
          <p><strong>Career:</strong> {result.Recommended_Career}</p>
          <p><strong>College Type:</strong> {result.Recommended_College_Type}</p>
          <p><strong>Score:</strong> {result.Recommendation_Score}</p>
        </div>
      )}
    </div>
  );
}

export default QuizForm;
