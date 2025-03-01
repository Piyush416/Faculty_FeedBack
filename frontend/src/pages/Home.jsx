import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom'
import messageContext from '../context/messageContext';




const Home = () => {
  const PORT = import.meta.env.VITE_API_PORT

  const [faculties, setFaculties] = useState([]);
  const [feedbackfaculties, setFeedBackFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isFeedBack, setFeedBack] = useState(false)
  const { selectedFaculty, setselectedFaculty } = useContext(messageContext)

  const navigate = useNavigate();


  const token = sessionStorage.getItem("token");
  const enrollment = localStorage.getItem("enrollment");

  // useEffect(() => {
  //   const faculty_api = import.meta.env.VITE_API
  //   fetch("https://customer-feedback-f5do.onrender.com/api/faculty")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFaculties(data);
  //       setFilteredFaculties(data);
  //       const uniqueSubjects = [...new Set(data.map(faculty => faculty.subject))];
  //       setSubjects(['All', ...uniqueSubjects]);
  //       (token) ? setFeedBack(true) : setFeedBack(false);
  //       if (token) {
  //         setFeedBack(true);
  //       } else {
  //         setFeedBack(false);
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching faculty data: ", error));

  //   // if (enrollment && token) {
  //   //   fetch(`${faculty_api}/enrollment`, {
  //   //     method: "POST",
  //   //     headers: { 'Content-Type': 'application/json' },
  //   //     body: JSON.stringify({ enrollment })
  //   //   })
  //   //     .then((response) => response.json())
  //   //     .then(data => console.log(data.message)
  //   //     )
  //   // }

  // }, []);


  useEffect(() => {
    const faculty_api = import.meta.env.VITE_API
    fetch("http://localhost:5000/api/sorted")
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data);
        setFilteredFaculties(data);
        const uniqueSubjects = [...new Set(data.map(faculty => faculty.subject))];
        setSubjects(['All', ...uniqueSubjects]);
        (token) ? setFeedBack(true) : setFeedBack(false);
        if (token) {
          setFeedBack(true);
        } else {
          setFeedBack(false);
        }
      })
      .catch((error) => console.error("Error fetching faculty data: ", error));
  }, []);


  const handleFilterChange = (subject) => {
    setSelectedSubject(subject);
    if (subject === 'All') {
      setFilteredFaculties(faculties);
    } else {
      setFilteredFaculties(faculties.filter(faculty => faculty.subject === subject));
    }
  };


  const handleStarClick = (facultyId, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [facultyId]: rating }));
  };

  const renderStars = (facultyId, currentRating) => {
    const rating = ratings[facultyId] || currentRating;
    return [...Array(5)].map((_, i) => (
      <span
        key={i + 1}
        className={`star ${i + 1 <= rating ? 'filled' : ''}`}
        onClick={() => handleStarClick(facultyId, i + 1)}
      >
        {i + 1 <= rating ? '★' : '☆'}
      </span>
    ));
  };


  function handleClickCard(faculty, rank) {
    navigate("/submit-feedback")
    localStorage.setItem("rank", rank);
    sessionStorage.setItem('selectedFacultySession', JSON.stringify(faculty));
  }


  return (

    <div className="home-container">

      <header className="header bg-linear-to-bl from-pink-500 to-red-500 border-none">
        <h1>Faculty Feedback System</h1>
      </header>


      {(isFeedBack) ? "" : <p className='warning'><Link to="/login">Login to submit FeedBack</Link></p>}

      <div className="content">
        <div className="filter-container">
          <select
            value={selectedSubject}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="filter-dropdown"
          >
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="faculty-cards ">
          {filteredFaculties.map((faculty, index) => (
            <>
              <div key={index} id={index} className="faculty-card  relative ">
                <div className='z-10 flex  absolute right-0 p-2 rounded-full'>
                  <span>Rank {index + 1}</span>
                </div>
                <div className=''>
                  <img
                    src={faculty.image || 'https://via.placeholder.com/150'}
                    alt={faculty.name}
                    className="faculty-image"
                  />
                </div>
                <div className="relative flex flex-col justify-center faculty-info h-auto">
                  <h3 className="faculty-name">{faculty.name}</h3>
                  <p><strong>Subject:</strong> {faculty.subject}</p>
                  <p><strong>Experience:</strong> {faculty.experience}</p>
                  <p ><strong>Qualification:</strong> {faculty.qualification}</p>

                  {/* submit feedback toggle*/}
                  {(isFeedBack) ? <div key={index} id={index} className="flex p-2">
                    {/* <div className="star-rating">
                      <p><strong>Rate this Faculty:</strong></p>
                      <div>{renderStars(faculty._id, 3)}</div>
                    </div> */}

                    {/* <textarea
                      value={feedbacks[faculty._id] || ''}
                      onChange={(event) => handleFeedbackChange(faculty._id, event)}
                      placeholder="Write your feedback here..."
                      rows="4"
                      className="feedback-input bg-white"
                    /> */}

                    
                    <button
                      onClick={() => { handleClickCard(faculty, index + 1) }}
                      className="submit-feedback cursor-pointer">
                      Submit Feedback
                    </button>
                  </div> : ""}

                </div>
              </div>
            </>
          ))}
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Feedback Submitted!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

