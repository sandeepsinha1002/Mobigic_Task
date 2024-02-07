// FileList.js
import React from "react";

const FileList = ({ files }) => {
  const handleDownload = (uniqueCode) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `http://localhost:5000/file/download/${uniqueCode}`;
    downloadLink.download = uniqueCode; // or any other preferred name
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col space-y-5 items-center mt-10">
      {files.map((file) => (
        <span key={file.uniqueCode} onClick={() => handleDownload(file.uniqueCode)}>
          {file.filename}
        </span>
      ))}
    </div>
  );
};

export default FileList;
