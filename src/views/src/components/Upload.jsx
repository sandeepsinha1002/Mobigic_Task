import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Upload = () => {
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
  
    if (!file) {
      alert("Please choose a file");
      return;
    }
  
    // Get the token from where you stored it (e.g., localStorage)
    const token = localStorage.getItem("token");
console.log(token)
    // Verify if the token is present
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch('http://localhost:5000/file/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert("File uploaded successfully");
        // Update the file list after a successful upload
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Internal Server Error");
    }
  };
  
  // Other functions...

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h2 className="text-[20px] font-semibold"> Upload </h2>
      <form className="flex flex-col" method="POST" onSubmit={handleUpload}>
        <label htmlFor="file">Choose a file:</label>
        <input type="file" id="file" name="file" required onChange={handleFileChange} />
        <br />
        <button type="submit" className="border-2 bg-black text-white p-2 ">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
