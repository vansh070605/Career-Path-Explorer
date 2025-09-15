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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [animation, setAnimation] = useState('slide-in');

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimation('slide-out');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnimation('slide-in');
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setAnimation('slide-out-back');
       setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setAnimation('slide-in-back');
      }, 300);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let recommendation = "Software Engineer at a Startup.";
    let improvement = "Focus on coding skills and prepare for technical interviews.";
    setResult({ recommendation, improvement });
  };
  
  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className="career-quiz-container">
      {!result ? (
        <>
          <div className="quiz-progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="quiz-card" key={currentQuestionIndex}>
             <div className={`question-content ${animation}`}>
              <span className="question-number">Question {currentQuestionIndex + 1}/{questions.length}</span>
              <h2 className="question-text">{currentQuestion.text}</h2>
              {currentQuestion.type === 'text' ? (
                <input 
                  type="text" 
                  value={answers[currentQuestion.id] || ''}
                  onChange={e => handleChange(currentQuestion.id, e.target.value)} 
                  placeholder="Type your answer here..."
                  className="quiz-input"
                />
              ) : (
                <select 
                  value={answers[currentQuestion.id] || ''}
                  onChange={e => handleChange(currentQuestion.id, e.target.value)}
                  className="quiz-select"
                >
                  <option value="" disabled>Select an option</option>
                  {currentQuestion.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
            </div>
          </div>
          <div className="quiz-navigation">
            <button onClick={handleBack} className="btn-nav btn-back" disabled={currentQuestionIndex === 0}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNext} className="btn-nav btn-next">
                Next <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-nav btn-submit">
                Get Results ✨
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="quiz-results">
          <h3>Here's Your Path!</h3>
          <div className="result-item">
            <div className="result-icon"><i className="fas fa-rocket"></i></div>
            <div className="result-text">
              <h4>Recommended Path</h4>
              <p>{result.recommendation}</p>
            </div>
          </div>
          <div className="result-item">
             <div className="result-icon"><i className="fas fa-tools"></i></div>
            <div className="result-text">
              <h4>Skills to Build</h4>
              <p>{result.improvement}</p>
            </div>
          </div>
          <button onClick={handleReset} className="btn-nav btn-retake">
            <i className="fas fa-redo"></i> Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerQuiz;