import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { BsCaretRight } from "react-icons/bs"; 

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
    <div className="container mt-main">
      <h1 className="mb-5">Frequently Asked Questions</h1>
      {faqs.map((faq) => (
        <div className="faq-container faq-item">
          <h4>{faq.question}</h4>
          <p><BsCaretRight /> {faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faq;
