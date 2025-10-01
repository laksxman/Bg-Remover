import React from "react";
import "./Steps.css";
import { Upload, Scissors, Download } from "lucide-react";

const Steps = () => {
  return (
    <div className="step-container">
      <h1 className="step-title">
        Steps to remove background <br /> image in seconds
      </h1>

      <div className="step-cards">
        {/* Step 1 */}
        <div className="step-card">
          <Upload className="step-icon" />
          <h2>Upload Image</h2>
          <p>Choose your photo and upload it to our background remover tool.</p>
        </div>

        {/* Step 2 */}
        <div className="step-card">
          <Scissors className="step-icon" />
          <h2>Remove Background</h2>
          <p>Our AI instantly erases the background while keeping your subject clear.</p>
        </div>

        {/* Step 3 */}
        <div className="step-card">
          <Download className="step-icon" />
          <h2>Download Image</h2>
          <p>Save your new background-free image in high quality within seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
