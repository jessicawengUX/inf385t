import React from "react";
import "./style.css"; // Assuming you create a Faq.css file for styling

const Faq = () => {
  const faqs = [
    {
      question: "Why can't I click on GroundCrew, VehicleCrew, and Collective?",
      answer: "Numbers for these categories are not provided in TC 3-20.40. The numbers for these categories are not public information and require a CAC to access. We are still working to find out what we are and are not allow to publish but to be safe, we chose not to release this information until we have permission to do so."
    },
    {
      question: "Where do you get you calculations from?",
      answer: "TC 3-20.40 Trainin and Qualification- Individual Weapons is available to anyone with internet access. All calculations are based on the numbers provided in this manual."
    },
    {
      question: "Why can't I save an event or view MyEvents?",
      answer: "You must log in to access these features"
    },
    // Add more FAQs here
  ];

  return (
    <div className="faq-container mt-main">
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faq;
