import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

const CollegeCard = ({ college, animationDelay }) => {
  const getSafeWebsite = (url) => {
    if (!url || url.trim() === "") return null;
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const websiteUrl = getSafeWebsite(college.website);

  return (
    <div
      className="p-6 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition duration-200"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* College Name */}
      <h3 className="text-xl font-bold text-gray-800">{college.college_name}</h3>

      {/* City */}
      <p className="text-gray-500 text-sm mt-1 flex items-center">
        <span className="mr-1">📍</span> {college.city}
      </p>

      {/* Website */}
      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Visit Website
        </a>
      )}

      {/* Rankings */}
      {college.rankings?.length > 0 && (
        <div className="mt-4 space-y-2">
          {college.rankings.map((ranking, i) => (
            <div
              key={i}
              className="flex justify-between bg-gray-50 px-4 py-2 rounded-md"
            >
              <span className="font-medium text-gray-700 capitalize">
                {ranking.field}
              </span>
              <span className="text-gray-600 text-sm">
                Ranking:{" "}
                <b>{ranking.ranking !== null ? ranking.ranking : "N/A"}</b> |{" "}
                Score: <b>{ranking.score !== null ? ranking.score : "N/A"}</b>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CollegeExplorer = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(`${API_BASE}/states`);
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("❌ Error fetching states:", err.message);
        setError("Failed to fetch states. Please check backend.");
      }
    };
    fetchStates();
  }, []);

  const fetchColleges = async (state) => {
    if (!state) return;
    setLoading(true);
    setError("");
    setColleges([]);
    try {
      const res = await fetch(`${API_BASE}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! ${res.status}`);
      }

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid API response");

      setColleges(data);
    } catch (err) {
      console.error("❌ Error fetching colleges:", err.message);
      setError(`Failed to fetch colleges: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getBestRanking = (college) => {
    if (!college.rankings?.length) return Infinity;
    const valid = college.rankings
      .map((r) => r.ranking)
      .filter((r) => r !== null);
    return valid.length ? Math.min(...valid) : Infinity;
  };

  const tier1 = colleges.filter((c) => getBestRanking(c) <= 10);
  const tier2 = colleges.filter((c) => {
    const r = getBestRanking(c);
    return r > 10 && r <= 25;
  });
  const others = colleges.filter(
    (c) => getBestRanking(c) > 25 && getBestRanking(c) !== Infinity
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Find Colleges by State</h2>

      <select
        className="border rounded-lg px-3 py-2 mb-6 shadow-sm focus:ring focus:ring-blue-200"
        value={selectedState}
        onChange={(e) => {
          const st = e.target.value;
          setSelectedState(st);
          fetchColleges(st);
        }}
      >
        <option value="">-- Select State --</option>
        {states.map((st, i) => (
          <option key={i} value={st}>
            {st}
          </option>
        ))}
      </select>

      {loading && <p>Loading colleges...</p>}

      {error && (
        <div className="mb-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            className="mt-2 px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
            onClick={() => fetchColleges(selectedState)}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {tier1.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Tier-1 Colleges</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tier1.map((c, i) => (
                  <CollegeCard
                    key={c.college_name}
                    college={c}
                    animationDelay={i * 100}
                  />
                ))}
              </div>
            </div>
          )}
          {tier2.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Tier-2 Colleges</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tier2.map((c, i) => (
                  <CollegeCard
                    key={c.college_name}
                    college={c}
                    animationDelay={i * 100}
                  />
                ))}
              </div>
            </div>
          )}
          {others.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Other Colleges</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((c, i) => (
                  <CollegeCard
                    key={c.college_name}
                    college={c}
                    animationDelay={i * 100}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !error && selectedState && colleges.length === 0 && (
        <p>No colleges found for {selectedState}.</p>
      )}
    </div>
  );
};

export default CollegeExplorer;
