import React, { useState } from 'react';
import './Faqs.css'; // CSS for FAQ component

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = {
        "Admissions": [
            {
                question: "How do I apply for undergraduate programs?",
                answer: "You can apply for undergraduate programs through our online application portal. Make sure to submit all required documents before the deadline."
            },
            {
                question: "What are the admission requirements?",
                answer: "Admission requirements include a completed application form, transcripts, standardized test scores, and letters of recommendation."
            },
            {
                question: "Can I apply for multiple programs?",
                answer: "Yes, you can apply for multiple programs, but you must submit a separate application for each program."
            }
        ],
        "Financial Aid": [
            {
                question: "How do I apply for financial aid?",
                answer: "To apply for financial aid, complete the FAFSA form and submit any additional documents required by the financial aid office."
            },
            {
                question: "What types of financial aid are available?",
                answer: "Financial aid options include scholarships, grants, student loans, and work-study programs."
            },
            {
                question: "When is the deadline to apply for financial aid?",
                answer: "The deadline to apply for financial aid is typically in early spring. Check the financial aid office's website for specific dates."
            }
        ],
        "Housing": [
            {
                question: "How do I apply for on-campus housing?",
                answer: "You can apply for on-campus housing through the housing portal on our website. Make sure to complete your application early to secure your spot."
            },
            {
                question: "What housing options are available?",
                answer: "Housing options include traditional dormitories, suite-style rooms, and apartment-style living."
            },
            {
                question: "Are there meal plans available?",
                answer: "Yes, there are several meal plans available to suit different dietary needs and preferences."
            }
        ],
        "Academics": [
            {
                question: "How do I register for classes?",
                answer: "Register for classes through the student portal. Follow the academic calendar for registration dates and deadlines."
            },
            {
                question: "Where can I find the academic calendar?",
                answer: "The academic calendar is available on the university website under the Academics section."
            },
            {
                question: "How can I get academic advising?",
                answer: "Academic advising is available through your department. Schedule an appointment with your academic advisor for personalized guidance."
            }
        ],
        "Campus Services": [
            {
                question: "What health services are available on campus?",
                answer: "The campus health center offers medical services, counseling, and wellness programs for students."
            },
            {
                question: "How do I access the library resources?",
                answer: "Library resources can be accessed online through the library portal or in-person at the campus library."
            },
            {
                question: "Are there career services available?",
                answer: "Yes, the career services office provides career counseling, resume workshops, and job placement assistance."
            }
        ]
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setActiveIndex(null);
    };

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h1>University FAQs</h1>
            <select className="faq-dropdown" onChange={handleCategoryChange}>
                <option value="">Select a Category</option>
                {Object.keys(categories).map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            {selectedCategory && categories[selectedCategory].map((faq, index) => (
                <div key={index} className="faq-item">
                    <div className="faq-question" onClick={() => handleClick(index)}>
                        {faq.question}
                    </div>
                    {activeIndex === index && (
                        <div className="faq-answer">
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FAQ;
