import React from "react";
import "./Testimonial.css";
import { User } from "lucide-react"; 
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Photographer",
    review:
      "This BG removal tool is amazing! I can remove backgrounds from my photos in seconds without losing quality.",
  },
  {
    name: "Rahul Verma",
    role: "Content Creator",
    review:
      "Super easy to use and results are always perfect. Highly recommended for social media visuals!",
  },
  {
    name: "Anita Singh",
    role: "Designer",
    review:
      "I love how quickly I can get high-quality images ready for my projects. This tool saves me so much time.",
  },
  {
    name: "Siddharth Mehta",
    role: "Photographer",
    review:
      "The tool is fast and accurate. Removing backgrounds has never been easier!",
  },
  {
    name: "Neha Kapoor",
    role: "Blogger",
    review:
      "Fantastic tool for creating clean images for my blog. The quality is always professional.",
  },
  {
    name: "Vikram Joshi",
    role: "Graphic Designer",
    review:
      "This software has become an essential part of my workflow. Highly efficient and easy to use.",
  },
];

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      <h2 className="testimonial-title">What Our Users Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-icon">
              <User size={40} color="#3b82f6" />
            </div>
            <p className="testimonial-review">"{t.review}"</p>
            <h3 className="testimonial-name">{t.name}</h3>
            <p className="testimonial-role">{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
