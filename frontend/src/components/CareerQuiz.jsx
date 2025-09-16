import React, { useState } from "react"
import "./CareerQuiz.css"

const questions = [
  { id: "Q1", text: "What are your favorite subjects?", type: "text" },
  { id: "Q2", text: "Which activities do you enjoy most?", type: "text" },
  { id: "Q3", text: "What do you consider your strongest skills?", type: "text" },
  { id: "Q4", text: "Which work style suits you better?", type: "select", options: ["Practical", "Theoretical", "Both"] },
  { id: "Q5", text: "What type of workplace do you prefer?", type: "select", options: ["Startup", "Research Lab", "Outdoors", "Corporate"] },
  { id: "Q6", text: "Are you ready for competitive exams?", type: "select", options: ["Yes", "No", "Maybe"] },
  { id: "Q7", text: "Where would you prefer to study/work?", type: "select", options: ["India", "Abroad"] },
  { id: "Q8", text: "What career values matter most to you?", type: "select", options: ["Job Security", "Creativity & Freedom", "Work-Life Balance"] },
  { id: "Q9", text: "What is your long-term career goal?", type: "text" },
  { id: "Q10", text: "What is your academic background (with %)?", type: "text" },
]

const CareerQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [animation, setAnimation] = useState("slide-in")

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimation("slide-out")
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1)
        setAnimation("slide-in")
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setAnimation("slide-out-back")
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev - 1)
        setAnimation("slide-in-back")
      }, 300)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Combine all answers into one text string
      const combined = Object.values(answers).join(" ")

      const res = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: combined }),
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error)

      setResult({ recommendation: data.career })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setResult(null)
  }

  return (
    <div className="career-quiz-container">
      {!result ? (
        <>
          <div className="quiz-progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="quiz-card" key={currentQuestionIndex}>
            <div className={`question-content ${animation}`}>
              <span className="question-number">
                Question {currentQuestionIndex + 1}/{questions.length}
              </span>
              <h2 className="question-text">{currentQuestion.text}</h2>

              {currentQuestion.type === "text" ? (
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="quiz-input"
                />
              ) : (
                <select
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                  className="quiz-select"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {currentQuestion.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="quiz-navigation">
            <button onClick={handleBack} className="btn-nav btn-back" disabled={currentQuestionIndex === 0}>
              ← Back
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNext} className="btn-nav btn-next">
                Next →
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-nav btn-submit" disabled={loading}>
                {loading ? "Predicting..." : "Get Results ✨"}
              </button>
            )}
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <div className="quiz-results">
          <h3>Your Personalized Recommendation</h3>
          <p>
            <strong>Recommended Path:</strong> {result.recommendation}
          </p>
          <button onClick={handleReset} className="btn-primary">
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  )
}

export default CareerQuiz
