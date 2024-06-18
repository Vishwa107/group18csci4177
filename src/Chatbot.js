import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [showDelayedDiv, setShowDelayedDiv] = useState(false);

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setResponse(inputValue);
          setInputValue('');
        }
    };
    useEffect(() => {
        if (response) {
          const timer = setTimeout(() => {
            setShowDelayedDiv(true);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
    }, [response]);

    return (
        <>
            <div className='chatbotSection'>
                <div className='firstmessage'>
                    Hi, How can I help you? I can help you in answering any questions related to subleasing terminology, and process? I can even help you in knowing your own personal details saved in the Account! 
                </div>
                <form className="input-form">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type your message here"
                        className="inputField"
                        onKeyPress={handleKeyPress}
                    />
                </form>
                {response && (
                    <div className="response">{response}</div>
                )}
                {showDelayedDiv && (
                <div className="chatAnswer">Vestibulum ornare, sem sed egestas pulvinar, ante tellus tincidunt tortor, ac lacinia urna lacus quis diam. Suspendisse varius pulvinar lacus, ac pharetra mi euismod ut. Proin commodo interdum libero, sit amet tincidunt libero tempus et. Cras eleifend ipsum nunc, eget tincidunt mi posuere auctor. In posuere, quam id feugiat suscipit, odio velit gravida magna, et gravida velit justo vitae lorem. In sed turpis tortor.</div>
                )}
            </div>
        </>
    );
};

export default Chatbot;
