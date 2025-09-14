import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CareerCard from "./CareerCard";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/career_quiz_dataset_1200.csv")
      .then((res) => res.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => setData(results.data || []),
        });
      })
      .catch((err) => {
        console.error("CSV load error:", err);
        setData([]);
      });
  }, []);

  const filtered = data.filter((row) => {
    if (!row) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (row.Recommended_Course || "").toLowerCase().includes(q) ||
      (row.Recommended_Career || "").toLowerCase().includes(q) ||
      (row.Q1_Favorite_Subjects || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Career Path Explorer</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses, careers, subjects..."
          className="search-input"
        />
      </header>

      <section className="display-flex">
        {filtered.map((row, idx) => (
          <div className="card-wrapper" key={(row && (row.StudentID || idx)) || idx}>
            <CareerCard row={row || {}} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
