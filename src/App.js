import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import title from './Images/title.jpeg';
import Card from './Components/Card';
import ai from './Images/ai.jpeg';
import senior from './Images/senior.webp';
import resgym from './Images/resgym.jpg';
import housing from './Images/housing.jpeg';
import halifax from './Images/Halifax.jpg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Faqs from './Components/Faqs.js';
import Chatbot from './Components/Chatbot.js';
import ContactUs from './Components/ContactUs'; 
import Popup from './Components/Popup.js';
import blogs from './Images/blogs.jpeg';
import Footer from './Components/Footer.js';
import Housing from './Components/Housing.js';
import ForgotPassword from './Components/Forgot.js';
import AddUser from './Components/AddUser.js';
import Login from './Components/Login.js';
import axios from 'axios';
import StoreLocator from './Components/StoreLocator.js';
import Matching from './Components/Matching';

function App() {
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState(null);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const isModalShown = localStorage.getItem('isModalShown');
    if (!isModalShown) {
      setShowModal(true);
      localStorage.setItem('isModalShown', 'true');
    }
  }, []);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Stored token:', token);
      if (token) {
        try {
          const response = await axios.get('https://group18csci4177.onrender.com/login/me', {
            headers: { Authorization: `Bearer ${token}` } 
          });
          if (response.data.success) {
            setUserName(response.data.user.name);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/4" element={<><Navbar userName={userName}/><Housing/><Footer/></>} />
          <Route path="/forgot-password" element={<><ForgotPassword /></>} />
          <Route path="/" element={ <Login/> } />
          <Route path="/signup" element={ <AddUser/> } />
          <Route path="/1" element={<><Navbar userName={userName}/><Matching/><Footer/></>} />
          <Route path="/3" element={<><Navbar userName={userName}/><StoreLocator/><Footer/></>} />
          <Route path="/2" element={
            <>
              <Navbar userName={userName} />
              <Faqs />
              <Chatbot />
              <Popup show={showModal} onClose={handleCloseModal} />
              <Footer />
            </>
          } />
          <Route path="/home" element={
            <>
              <Navbar userName={userName} />
              <div className='imageContainer'>
                <img src={title} alt='Housingimagehere' className='housingImage'/>
                <div className='textOverlay'>Find Housing<br></br>Meet your Seniors<br></br>and More!</div>
              </div>
              <div className="CardsContainer">
                <Card
                id={1}
                image={senior}
                heading="Meet with Senior"
                text="The Meet Your Senior feature connects junior students with experienced mentors. It offers detailed profiles, contact infromation, and subject expertise. Students can contact them through email, provide feedback, and search by expertise. This enhances mentorship and networking opportunities, fostering professional growth and facilitating knowledge sharing within the organization."
                />
                <Card
                  id={2}
                  image={ai}
                  heading="AI Chatbot and FAQs"
                  text="The AI Chatbot feature provides instant, automated assistance by answering user queries and facilitating interactions. It utilizes natural language processing to understand and respond accurately. FAQs offer a collection of common questions and answers, giving users quick access to essential information without needing direct support."
                />
                <Card
                  id={3}
                  image={resgym}
                  heading="Restaurants and Gyms Near Me"
                  text="The Restaurants and Gyms Near Me feature uses location data to identify and display nearby dining and fitness options. It provides users with a list of local restaurants and gyms, complete with details like ratings, addresses, and operating hours, enhancing convenience and accessibility for their needs."
                />
              </div>
              <div className='CardsContainer'>
                <Card
                  id={4}
                  image={housing}
                  heading="Accommodation Listings"
                  text="The Accommodation Listings feature offers a comprehensive database of available lodging options. Students can search for accommodations based on location, price, and amenities. It provides detailed information on each listing, including photos, reviews, and booking details, to help users find and secure their ideal place to stay."
                />
                <Card
                  id={5}
                  image={halifax}
                  heading="Learn more about Halifax!"
                  text="The Learn More About Halifax! feature provides users with insightful information about Halifax, including its history, attractions, and local culture. It offers detailed guides, tips, and recommendations for exploring the city, helping users discover notable landmarks, dining options, and activities to enhance their visit."
                />
                <Card
                  id={6}
                  image={blogs}
                  heading="Student Blogs"
                  text="The Student Blogs feature showcases personal experiences and insights from students. It offers a platform for students to share their academic journey, campus life, and tips on navigating university life. The blogs provide valuable perspectives, advice, and stories to connect with and support fellow students."
                />
              </div>
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/* References:
1. Google Fonts, URL: https://fonts.google.com/selection?preview.text=Meet%20your%20Seniors%0AFind%20Housing%0Aand%20More!
2. Pexels, Title Image. URL: https://www.pexels.com/photo/exterior-of-modern-white-residential-condominium-5033768/
3. AI chatbot image, URL: “Enjoy these Chatbot Images for free,” Freepik, Dec. 19, 2023. Available: https://www.freepik.com/free-photos-vectors/chatbot
4. Lorem Ipsum, URL: https://www.lipsum.com/feed/html
5. Restaurant and Gym image, “Behance.” Available: https://www.behance.net/gallery/51661577/Healthy-Food-Animated-Series
6. Students talking: E. J. Macababbad, “Anatomy of An Online Friend,” The Edj View, Jan. 10, 2022. Available: https://edjview.wordpress.com/2022/01/10/anatomy-of-an-online-friend/
7. Housing image: “Enjoy these Cartoon Building Images for free,” Freepik, Dec. 27, 2023. Available: https://www.freepik.com/free-photos-vectors/cartoon-building
8. Halifax image: J. Pinto, “DHX selling Halifax animation studio,” Nov. 08, 2018. Available: https://kidscreen.com/2018/11/08/dhx-to-sell-halifax-animation-studio/
9. Blogs image: A. Otalvaro, “How to Transform Blog Articles into Animated Videos in Four Easy Steps,” Video Marketing & Growth Blog | Raw Shorts, Jun. 12, 2019. Available: https://www.rawshorts.com/blog/how-to-transform-blog-articles-into-animated-videos-in-four-easy-steps/
*/
