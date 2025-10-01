import React, { useRef, useState } from "react";
import "./BigSlide.css";
import girlwithbg from "../assets/girlwithbg.jpg";
import girlwithoutbg from "../assets/girlwithoutbg.png";

const BigSlide = () => {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50); 

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((e.clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    setSliderPos(pos);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    setSliderPos(pos);
  };

  return (
    <div className="bigslide-container">
      <h1 className="bigslide-title">
        Remove background with high <br /> Quality and Accuracy
      </h1>

      <div
        className="bigslide-wrapper"
        ref={containerRef}
        onMouseMove={(e) => e.buttons === 1 && handleMouseMove(e)}
        onTouchMove={handleTouchMove}
      >
        {/* Bottom image */}
        <img
          src={girlwithbg}
          alt="With Background"
          className="with-bg"
        />

        {/* Top image */}
        <div
          className="without-bg"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={girlwithoutbg}
            alt="Without Background"
          />
        </div>

        {/* Slider handle */}
        <div
          className="slider-handle"
          style={{ left: `${sliderPos}%` }}
        />
      </div>
    </div>
  );
};

export default BigSlide;
