import React, { useContext } from "react";
import "./Upload.css";
import { AppContext } from "../context/AppContext";

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="upload-container">
      <h1 className="upload-title">See the magic, Try now!</h1>
      <div className="upload-box">
        <input
          type="file"
          id="upload2"
          accept="image/*"
          onChange={(e) => removeBg(e.target.files[0])}
        />
        <label htmlFor="upload2" className="upload-btn">
          Upload Image
        </label>
      </div>
      <p className="upload-note">
        Supported formats: JPG, PNG. Maximum file size: 10MB
      </p>
    </div>
  );
};

export default Upload;
