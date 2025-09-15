import React, { useState } from 'react';
import './CareerQuiz.css';

const questions = [
  { id: 'Q1', text: 'What are your favorite subjects?', type: 'text' },
  { id: 'Q2', text: 'Which activities do you enjoy most?', type: 'text' },
  { id: 'Q3', text: 'What do you consider your strongest skills?', type: 'text' },
  { id: 'Q4', text: 'Which work style suits you better?', type: 'select', options: ['Practical', 'Theoretical', 'Both'] },
  { id: 'Q5', text: 'What type of workplace do you prefer?', type: 'select', options: ['Startup', 'Research Lab', 'Outdoors', 'Corporate'] },
  { id: 'Q6', text: 'Are you ready for competitive exams?', type: 'select', options: ['Yes', 'No', 'Maybe'] },
  { id: 'Q7', text: 'Where would you prefer to study/work?', type: 'select', options: ['India', 'Abroad'] },
  { id: 'Q8', text: 'What career values matter most to you?', type: 'select', options: ['Job Security', 'Creativity & Freedom', 'Work-Life Balance'] },
  { id: 'Q9', text: 'What is your long-term career goal?', type: 'text' },
  { id: 'Q10', text: 'What is your academic background (with %)?', type: 'text' },
];

const CareerQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let recommendation = "Software Engineer at a Startup.";
    let improvement = "Focus on coding skills and prepare for technical interviews.";
    
    if (answers.Q4 === 'Theoretical' && answers.Q5 === 'Research Lab') {
      recommendation = "Research Scientist.";
      improvement = "Strengthen your fundamentals in core subjects and consider a Master's degree.";
    } else if (answers.Q8 === 'Work-Life Balance' && answers.Q5 === 'Corporate') {
      recommendation = "Data Analyst in a Corporate firm.";
      improvement = "Develop skills in SQL, Python, and data visualization tools.";
    }

    setResult({ recommendation, improvement });
  };

  return (
    <div className="career-quiz-container">
      <h2>Find Your Career Path</h2>
      {!result ? (
        <form onSubmit={handleSubmit} className="quiz-form">
          {questions.map(q => (
            <div key={q.id} className="question-block">
              <label>{q.text}</label>
              {q.type === 'text' ? (
                <input type="text" onChange={e => handleChange(q.id, e.target.value)} required />
              ) : (
                <select onChange={e => handleChange(q.id, e.target.value)} required>
                  <option value="">Select an option</option>
                  {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
            </div>
          ))}
          <button type="submit" className="btn-primary">Get Recommendation</button>
        </form>
      ) : (
        <div className="quiz-results">
          <h3>Your Personalized Recommendation</h3>
          <p><strong>Recommended Path:</strong> {result.recommendation}</p>
          <p><strong>Areas to Improve:</strong> {result.improvement}</p>
          <button onClick={() => setResult(null)} className="btn-primary">Retake Quiz</button>
        </div>
      )}
    </div>
  );
};

export default CareerQuiz;