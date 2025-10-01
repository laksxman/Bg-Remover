import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [uToken, setUToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const backendUrl = "http://localhost:4000";


  const resizeImage = (file, maxWidth = 1024) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => resolve(blob), file.type, 0.9);
      };
    });
  };


  const handleRegister = async (userData) => {
    try {
      const res = await fetch(`${backendUrl}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful ✅");
        return data;
      } else {
        toast.error(data.message || "Registration failed ❌");
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };


  const handleLogin = async (credentials) => {
    try {
      const res = await fetch(`${backendUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.ok) {
        Cookies.set("token", data.token);
        localStorage.setItem("token", data.token); 
        setUToken(data.token);
        setUserData(data.user || null);
        toast.success("Login successful ✅");
        return data;
      } else {
        toast.error(data.message || "Login failed ❌");
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };


  const removeBg = async (imageFile) => {
    if (!imageFile) {
      toast.error("Please upload an image first!");
      return;
    }

    try {
      setImage(imageFile);
      setResultImage(null);
      setIsProcessing(true);
      navigate("/result");

      const resizedFile = await resizeImage(imageFile, 1024);
      const formData = new FormData();
      formData.append("image", resizedFile, imageFile.name);

      const token = Cookies.get("token") || uToken;

      const { data } = await axios.post(
        `${backendUrl}/api/images/remove-bg`,
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setResultImage(data.resultImage);
      } else {
        toast.error(data.message || "Failed to remove background ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const value = {
    backendUrl,
    handleRegister,
    handleLogin,
    removeBg,
    setUToken,
    uToken,
    userData,
    setUserData,
    image,
    setImage,
    resultImage,
    setResultImage,
    isProcessing, // new: indicates loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
