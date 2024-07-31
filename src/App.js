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
          const response = await axios.get('http://localhost:5001/login/me', {
            headers: { Authorization: `Bearer ${token}` } // Ensure token is prefixed with 'Bearer '
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
          {/* <Route path="/2" element={<Faqs />} /> */}
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/4" element={<><Navbar/><Housing/><Footer/></>} />
          <Route path="/forgot-password" element={<><ForgotPassword /></>} />
          <Route path="/" element={ <Login/> } />
          <Route path="/signup" element={ <AddUser/> } />
          <Route path="/1" element={<h1>Card 1 Details</h1>} />
          <Route path="/3" element={<StoreLocator/>} />
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
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in rutrum nunc. Donec ultrices augue id urna venenatis, eu laoreet dui hendrerit. Nunc commodo neque quis elit tincidunt, eget scelerisque lorem iaculis. Etiam at dignissim orci. Proin condimentum nec diam sed sagittis. Vivamus sit amet velit vel lorem tincidunt consequat. Morbi maximus tempus nibh, quis egestas libero cursus at. Proin in eros hendrerit, fringilla eros id, rutrum mauris. Mauris vel nulla porta, bibendum justo in, vulputate purus."
                />
                <Card
                  id={2}
                  image={ai}
                  heading="AI Chatbot and FAQs"
                  text="Duis dignissim placerat est ac semper. Phasellus vel bibendum eros. Vestibulum in ex auctor, pellentesque lectus sit amet, vestibulum mauris. Aliquam dignissim fringilla ligula. Fusce vitae urna dapibus, lacinia nisi scelerisque, tincidunt velit. Fusce at ullamcorper mi, a faucibus mauris. Ut urna ipsum, rutrum vel rutrum et, tincidunt eu dolor."
                />
                <Card
                  id={3}
                  image={resgym}
                  heading="Restaurants and Gyms Near Me"
                  text="Etiam efficitur sed leo eget porta. Vestibulum ornare, sem sed egestas pulvinar, ante tellus tincidunt tortor, ac lacinia urna lacus quis diam. Suspendisse varius pulvinar lacus, ac pharetra mi euismod ut. Proin commodo interdum libero, sit amet tincidunt libero tempus et. Cras eleifend ipsum nunc, eget tincidunt mi posuere auctor. In posuere, quam id feugiat suscipit, odio velit gravida magna, et gravida velit justo vitae lorem. In sed turpis tortor. Donec hendrerit mauris sit amet nulla aliquet condimentum. Vivamus mollis metus vel diam venenatis, eget laoreet orci placerat."
                />
              </div>
              <div className='CardsContainer'>
                <Card
                  id={4}
                  image={housing}
                  heading="Accommodation Listings"
                  text="Sed a enim odio. Ut tincidunt ligula eu maximus luctus. Donec finibus efficitur varius. Suspendisse sagittis rutrum cursus. Sed eget imperdiet arcu, ut tempor nulla. Ut aliquet ligula elit, sed rhoncus magna gravida nec. Phasellus ut feugiat metus, non efficitur leo. Integer at massa sed orci iaculis mollis. Sed rutrum erat ut ante pellentesque rutrum. Maecenas imperdiet sagittis dolor, eget cursus augue malesuada a."
                />
                <Card
                  id={5}
                  image={halifax}
                  heading="Learn more about Halifax!"
                  text="Duis fermentum eu turpis venenatis viverra. Praesent tincidunt risus sed suscipit porttitor. Praesent non dui velit. Morbi lacinia, justo varius suscipit condimentum, mauris massa ullamcorper neque, nec aliquet purus elit vitae nibh. Donec vel interdum lectus, ut pharetra urna. Proin aliquet massa at mauris aliquam hendrerit."
                />
                <Card
                  id={6}
                  image={blogs}
                  heading="Student Blogs"
                  text="Duis fermentum eu turpis venenatis viverra. Praesent tincidunt risus sed suscipit porttitor. Praesent non dui velit. Morbi lacinia, justo varius suscipit condimentum, mauris massa ullamcorper neque, nec aliquet purus elit vitae nibh. Donec vel interdum lectus, ut pharetra urna. Proin aliquet massa at mauris aliquam hendrerit."
                />
              </div>
              {/* <div className='cardd'>
                <Card
                  id={7}
                  image={connect}
                  heading="Connect with Us"
                  text="Duis fermentum eu turpis venenatis viverra. Praesent tincidunt risus sed suscipit porttitor. Praesent non dui velit. Morbi lacinia, justo varius suscipit condimentum, mauris massa ullamcorper neque, nec aliquet purus elit vitae nibh. Donec vel interdum lectus, ut pharetra urna. Proin aliquet massa at mauris aliquam hendrerit."
                />
              </div> */}
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
