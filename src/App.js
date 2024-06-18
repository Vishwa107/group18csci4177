import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import house from './housing.webp';
import Card from './Card';
import ai from './ai.jpeg';
import senior from './senior.jpeg';
import resgym from './resgym.jpg';
import houses from './houses.jpeg';
import halifax from './Halifax.jpg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Faqs from './Faqs.js';
import Chatbot from './Chatbot.js';
import Popup from './Popup.js';

function App() {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // useEffect(() => {
  //   setShowModal(true);
  // }, []);

  useEffect(() => {
    const isModalShown = localStorage.getItem('isModalShown');
    if (!isModalShown) {
      setShowModal(true);
      localStorage.setItem('isModalShown', 'true');
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/1" element={<h1>Card 1 Details</h1>} />
          <Route path="/2" element={
            <>
              <Navbar />
              <Faqs />
              <Chatbot />
              <Popup show={showModal} onClose={handleCloseModal} />
            </>
          } />
          <Route path="/" element={
            <>
              <Navbar />
              <div className='imageContainer'>
                <img src={house} alt='Housingimagehere' className='housingImage'/>
                <div className='textOverlay'>Find Housing<br></br>Meet your Seniors<br></br>and More!</div>
                {/* <div className='textOverlay'>MEET YOUR SENIORS<br></br>FIND HOUSING<br></br>AND MORE!</div> */}
              </div>
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
              <Card
                id={4}
                image={houses}
                heading="Accommodation Listings"
                text="Sed a enim odio. Ut tincidunt ligula eu maximus luctus. Donec finibus efficitur varius. Suspendisse sagittis rutrum cursus. Sed eget imperdiet arcu, ut tempor nulla. Ut aliquet ligula elit, sed rhoncus magna gravida nec. Phasellus ut feugiat metus, non efficitur leo. Integer at massa sed orci iaculis mollis. Sed rutrum erat ut ante pellentesque rutrum. Maecenas imperdiet sagittis dolor, eget cursus augue malesuada a."
              />
              <Card
                id={5}
                image={halifax}
                heading="Learn more about Halifax!"
                text="Duis fermentum eu turpis venenatis viverra. Praesent tincidunt risus sed suscipit porttitor. Praesent non dui velit. Morbi lacinia, justo varius suscipit condimentum, mauris massa ullamcorper neque, nec aliquet purus elit vitae nibh. Donec vel interdum lectus, ut pharetra urna. Proin aliquet massa at mauris aliquam hendrerit."
              />
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
2. Pexels, Housing Image. URL: https://www.pexels.com/photo/exterior-of-modern-white-residential-condominium-5033768/
3. AI chatbot image, URL: “Enjoy these Chatbot Images for free,” Freepik, Dec. 19, 2023. Available: https://www.freepik.com/free-photos-vectors/chatbot
4. Lorem Ipsum, URL: https://www.lipsum.com/feed/html
5. Restaurant and Gym image, “Behance.” Available: https://www.behance.net/gallery/51661577/Healthy-Food-Animated-Series
6. Students talking: markOfshell et al., “Two people, a man and a woman, are sitting and talking to each other, colorful human illustrations on white background stock vector art 1278082136.” Available: https://www.istockphoto.com/search/2/image?mediatype=illustration&phrase=two+students+talking
7. Building image: M. Moxumbic, flat cartoon side view of high rise building city town. Available: https://www.vecteezy.com/free-vector/cartoon-buildings
8. Halifax image: J. Pinto, “DHX selling Halifax animation studio,” Nov. 08, 2018. Available: https://kidscreen.com/2018/11/08/dhx-to-sell-halifax-animation-studio/
*/
