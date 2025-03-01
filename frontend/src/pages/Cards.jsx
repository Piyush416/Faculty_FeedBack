import React, { useContext, useEffect, useState } from 'react'
import MessageContext from '../context/messageContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Cards = () => {
  const { selectedFaculty, setselectedFaculty } = useContext(MessageContext)

  const [ReviewValue, setReviewValue] = useState()
  const [canGiveFeedBack, setcanGiveFeedBack] = useState(true);
  const [clickSubmit, setclickSubmit] = useState(false);

  const selectedFacultySession = JSON.parse(sessionStorage.getItem("selectedFacultySession" || "{}"));


  const hashEnrollment = localStorage.getItem('hashEnrollment')
  const enrollment = localStorage.getItem('enrollment')
  const token = sessionStorage.getItem('token')
  const rank = localStorage.getItem('rank')
  const [totalFeedBacks, setTotalFeedBacks] = useState(selectedFacultySession.feedback_count);




  // checking that user can give feedback
  useEffect(() => {
    const facultyobjId = selectedFacultySession._id;
    const response = fetch(`${API_BASE_URL}/api/isFeedBackExist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, enrollment, hashEnrollment, facultyobjId })
    })

      .then((response) => response.json())

      .then((resp) => {
        console.log(resp);
        if (resp.canGive) {
          setcanGiveFeedBack(false);
          setTotalFeedBacks(resp.TotalfeedBacks);
        }
      })
      .catch((error) => alert("Error to Fetch ", error))
  }, [])




  const handleSubmitReview = async () => {
    if (!ReviewValue) return;


    const facultyId = selectedFacultySession._id;
    const facultyName = selectedFacultySession.name;
    const feedbackText = ReviewValue;

    const response = await fetch("http://localhost:5000/user/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ facultyId, facultyName, feedbackText, enrollment, hashEnrollment, token })
    })

    const resp = await response.json();
    if (response.ok) {
      setclickSubmit(true);
      setcanGiveFeedBack(false);
      setTotalFeedBacks(totalFeedBacks + 1);
    }
    else {
      alert(resp.message);
    }
  }


  return (
    <div className='  h-screen'>
      <div className='relative  flex justify-center items-center h-screen w-full'>
        {/* background image */}
        <div className='w-full absolute top-0 h-[50%] bg-linear-to-bl from-pink-500 to-red-500 z-0'>
          <div className='flex relative'>
            <div className='absolute right-10 top-2 w-20 h-20 rounded-full  bg-gray-50 opacity-18'></div>
            <div className='absolute right-40 top-15 w-30 h-30 rounded-full  bg-gray-50 opacity-12'></div>
            <div className='absolute right-80 top-35 w-40 h-40 rounded-full  bg-gray-50 opacity-7'></div>
            <div className='absolute  w-40 h-40 rounded-full  bg-gray-50 opacity-20'></div>
            <div className='absolute top-20 left-60  w-50 h-50 rounded-full  bg-gray-50 opacity-5'></div>
            <div className='absolute top-60 -left-50 w-60 h-60 rounded-full  bg-gray-50 opacity-10'></div>
          </div>

        </div>

        <div className='relative shadow-2xl w-xl h-fit rounded-3xl bg-white z-1'>

          {/* Main div */}
          <div className='relative -top-15 w-md  mx-auto  '>
            {/* Child 1 */}
            <div className='relative flex justify-center'>
              <img src={selectedFacultySession?.image || 'https://picsum.photos/200'} alt="error" className='w-[30%] h-[30%] rounded-full object-fill' />
            </div>
            {/* Child 2 */}
            <div className=''>
              {/* Profess Details Section */}
              <div className='relative my-5 flex flex-col text-center '>
                <h1 className='text-3xl text-center mb-3'>Profess. {selectedFacultySession?.name || "Piyush"} </h1>
                <span className='font-extralight text-gray-500 '>Subject: {selectedFacultySession?.subject || 'Python'}</span>
                <span className='font-extralight text-gray-500 '>Experience: {selectedFacultySession?.experience || '5Year'}</span>
                <span className='font-extralight text-gray-500 '>Qualification: {selectedFacultySession?.qualification || 'Master from Harvad Unviersity'}</span>
              </div>
              {/* Child 3 */}
              <div className=' flex justify-evenly items-center mx-10 my-3'>
                <div className=' flex flex-col p-1'>
                  <span className=' text-center'>{totalFeedBacks}</span>
                  <span className=' px-2 text-center'>Total Feedbacks</span>
                </div>
                <div className=' flex flex-col p-1'>
                  <span className=' text-center'>{rank}</span>
                  <span className=' px-2 text-center'>Ranking</span>
                </div>
                <div className=' flex flex-col p-1'>
                  <span className=' text-center'>Anger</span>
                  <span className=' px-2 text-center'>Mood</span>
                </div>
              </div>
              {/* Child 4 */}

              {(canGiveFeedBack) ? <div className='flex flex-col justify-center items-center'>
                <textarea
                  name="" id=""
                  className=' w-xs p-2 outline-none resize-none border border-gray-400 rounded-md'
                  placeholder='Enter you Review'
                  value={ReviewValue}
                  onChange={(event) => { setReviewValue(event.target.value) }}
                  required
                />
                <div className='text-center mt-3'>
                  <button onClick={handleSubmitReview} className='px-8 py-2 rounded-full bg-linear-to-bl from-pink-500 to-red-500 text-white cursor-pointer'>Submit</button>
                </div>
              </div> :
                <div className=' text-center p-2 font-black tracking-wider'>
                  <marquee>Thanks for your valuable feedback. 😊</marquee>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}



export default Cards
