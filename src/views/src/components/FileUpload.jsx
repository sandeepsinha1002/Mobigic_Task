// FileUploadApp.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Upload from "./Upload";
import Navbar from "./Navbar";
import FileList from "./FileList";

const FileUploadApp = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from where you stored it (e.g., localStorage)
        const token = localStorage.getItem("token");
        
        const response = await fetch("http://localhost:5000/file/list", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const fileList = await response.json();
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [files]); // Empty dependency array ensures that it runs only once when the component mounts
   // Empty dependency array ensures that it runs only once when the component mounts

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>

        <h2 className="mt-10 text-center text-[25px] font-bold">
          Uploaded Files
        </h2>
        <h3 className="text-center text-[20px] mt-5">Click below to download</h3>
        <FileList files={files} />
      </div>
    </BrowserRouter>
  );
};

export default FileUploadApp;
