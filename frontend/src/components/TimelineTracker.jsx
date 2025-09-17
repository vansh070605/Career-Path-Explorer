import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TimelineTracker.css';

// --- REAL-TIME DATA (as of late 2024 for the 2025 academic year) ---
// This array is now populated with the most current, real-world dates.
const realTimeEventsData = [
  { 
    title: 'JEE Main 2025 (Session 1) Application', 
    date: '2024-11-22T21:00:00',
    category: 'Entrance Exam', 
    link: 'https://jeemain.nta.ac.in/' 
  },
  { 
    title: 'GATE 2025 Registration (with late fee)', 
    date: '2024-10-11T23:59:59',
    category: 'Entrance Exam', 
    link: 'https://gate2025.iitr.ac.in/' 
  },
  { 
    title: 'National Scholarship Portal (NSP) Renewal', 
    date: '2024-10-31T23:59:59',
    category: 'Scholarship', 
    link: 'https://scholarships.gov.in/' 
  },
  { 
    title: 'Prime Minister\'s Scholarship Scheme (PMSS)', 
    date: '2024-11-30T23:59:59',
    category: 'Scholarship', 
    link: 'https://www.desw.gov.in/prime-ministers-scholarship-scheme-pmss' 
  },
  { 
    title: 'JEE Main 2025 (Session 2) Application', 
    date: '2025-02-24T21:00:00',
    category: 'Entrance Exam', 
    link: 'https://jeemain.nta.ac.in/' 
  },
  { 
    title: 'NEET UG 2025 Application', 
    date: '2025-03-07T21:00:00',
    category: 'Entrance Exam', 
    link: 'https://exams.nta.ac.in/NEET/' 
  },
  { 
    title: 'CUET UG 2025 Application', 
    date: '2025-03-24T23:50:00',
    category: 'Entrance Exam', 
    link: 'https://exams.nta.ac.in/CUET-UG/' 
  },
];

// --- Helper Components ---
const getEventStatus = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    if (eventDate < now) return { text: 'Closed', priority: 3 };
    if (eventDate <= thirtyDaysFromNow) return { text: 'Active', priority: 1 };
    return { text: 'Upcoming', priority: 2 };
};

const TimeLeft = ({ date }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(date) - +new Date();
    if (difference <= 0) return {};
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [date]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!Object.keys(timeLeft).length) return null;

  return (
    <div className="countdown">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="countdown-item">
          <div className="countdown-value">{value}</div>
          <div className="countdown-label">{interval}</div>
        </div>
      ))}
    </div>
  );
};

// --- Main TimelineTracker Component ---
const TimelineTracker = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const dataWithStatus = realTimeEventsData.map(event => ({
                ...event,
                status: getEventStatus(event.date),
            }));
            setEvents(dataWithStatus);

        } catch (err) {
            setError('Could not fetch events. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const filteredAndSortedEvents = useMemo(() => {
        return events
            .filter(event => {
                const matchesFilter = filter === 'All' || event.category === filter;
                const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesFilter && matchesSearch;
            })
            .sort((a, b) => a.status.priority - b.status.priority || new Date(a.date) - new Date(b.date));
    }, [events, filter, searchTerm]);

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>Admissions & Scholarship Timeline</h2>
        <p>Stay updated with all the important upcoming deadlines for exams, admissions, and scholarships.</p>
      </div>

      <div className="timeline-controls">
        <div className="filter-buttons">
            <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
            <button className={filter === 'Entrance Exam' ? 'active' : ''} onClick={() => setFilter('Entrance Exam')}>Exams</button>
            <button className={filter === 'Scholarship' ? 'active' : ''} onClick={() => setFilter('Scholarship')}>Scholarships</button>
            <button className={filter === 'Admission' ? 'active' : ''} onClick={() => setFilter('Admission')}>Admissions</button>
        </div>
        <div className="search-box-container">
            <i className="fas fa-search"></i>
            <input
                type="text"
                className="search-box"
                placeholder="Search for an event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="timeline">
        {loading && (
            <div className="loading-spinner"><div></div><div></div><div></div></div>
        )}
        {error && (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button className="btn-retry" onClick={fetchEvents}>
                    <i className="fas fa-redo"></i> Retry
                </button>
            </div>
        )}
        {!loading && !error && (
            filteredAndSortedEvents.length > 0 ? (
                filteredAndSortedEvents.map((event, index) => (
                  <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="timeline-dot"></div>
                    <div className="event-card">
                      <div className={`status-tag ${event.status.text.toLowerCase()}`}>{event.status.text}</div>
                      <div className="event-details">
                          <span className={`category-chip ${event.category.toLowerCase().replace(' ', '-')}`}>{event.category}</span>
                          <h3>{event.title}</h3>
                          <p><i className="fas fa-calendar-day"></i> Deadline: {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div className="event-actions">
                          <TimeLeft date={event.date} />
                          <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn-apply">
                          View Details <i className="fas fa-external-link-alt"></i>
                          </a>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
                <div className="no-events-message">
                    <p>No events found for your current search or filter.</p>
                </div>
            )
        )}
      </div>
    </div>
  );
};

export default TimelineTracker;