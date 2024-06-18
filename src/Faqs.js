import React from 'react';
import './Faqs.css';

const Faqs = () => {

    return (
        <>
            <div className='faqsSection'>
                <h1>FAQs Section</h1>
                <div className='question'>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in rutrum nunc?</div>
                <div className='answer'>Donec ultrices augue id urna venenatis, eu laoreet dui hendrerit. Nunc commodo neque quis elit tincidunt, eget scelerisque lorem iaculis. Etiam at dignissim orci. Proin condimentum nec diam sed sagittis. Vivamus sit amet velit vel lorem tincidunt consequat. Morbi maximus tempus nibh, quis egestas libero cursus at. Proin in eros hendrerit, fringilla eros id, rutrum mauris. Mauris vel nulla porta, bibendum justo in, vulputate purus.</div>
                <br></br>
                <div className='question'>2. Etiam efficitur sed leo eget porta.?</div>
                <div className='answer'>Vestibulum ornare, sem sed egestas pulvinar, ante tellus tincidunt tortor, ac lacinia urna lacus quis diam. Suspendisse varius pulvinar lacus, ac pharetra mi euismod ut. Proin commodo interdum libero, sit amet tincidunt libero tempus et. Cras eleifend ipsum nunc, eget tincidunt mi posuere auctor. In posuere, quam id feugiat suscipit, odio velit gravida magna, et gravida velit justo vitae lorem. In sed turpis tortor.</div>
            </div>
        </>
    );
};

export default Faqs;