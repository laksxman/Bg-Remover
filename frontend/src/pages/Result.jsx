import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./Result.css";

const Result = () => {
  const { image, resultImage } = useContext(AppContext);

  return (
    <div className="result-container">
      <h2 className="result-title">Your Result</h2>
      <div className="result-images">
        {/* Original Image */}
        <div className="image-card">
          <p className="image-label">Original</p>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Original"
              className="result-img"
            />
          ) : (
            <div className="placeholder">No Image Uploaded</div>
          )}
        </div>

        {/* Background Removed Image */}
        <div className="image-card">
          <p className="image-label">Background Removed</p>
          {resultImage ? (
            <img src={resultImage} alt="Result" className="result-img" />
          ) : image ? (
            <div className="placeholder loading">Processing...</div>
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>
      </div>

      {/* Download Button */}
      {resultImage && (
        <div className="download-container">
          <a
            href={resultImage}
            download="bg_removed_image.png"
            className="download-btn"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default Result;
