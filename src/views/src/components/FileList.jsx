// FileList.js
import React, { useState } from "react";

const FileList = ({ files }) => {
  const [download, setDownload] = useState("gdggdd");
  const [show, setShow] = useState(false);

  const [code, setCode] = useState("");
  const handleDownload = (uniqueCode) => {
    setDownload(uniqueCode);

    const downloadLink = document.createElement("a");
    downloadLink.href = `http://localhost:5000/file/download/${uniqueCode}`;
    downloadLink.download = uniqueCode; // or any other preferred name
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const handleSubmit = (e) => {
    // // setShow(!show);
    e.preventDefault();
    if (code == download) {
      const downloadLink = document.createElement("a");
      downloadLink.href = `http://localhost:5000/file/download/${download}`;
      downloadLink.download = download; // or any other preferred name
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.log("no");
    }
  };
  const handleInput = (uniqueCode) => {
    setDownload(uniqueCode)
    setShow(!show);
  };

  return (
    <div className="flex flex-col space-y-5 items-center mt-10">
      {files.map((file) => (
        // setDownload(file.uniqueCode) &&
        <span
          className="border-2 p-2 text-white bg-black cursor-pointer  "
          key={file.uniqueCode}
          // onClick={() => handleDownload(file.uniqueCode)}
          onClick={()=>handleInput(file.uniqueCode)}
        >
          {file.filename}
        </span>
      ))}
      {show && (
        <form action="" onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input 
          className="border-2 border-black"
            type="text"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <button type="submit" className="border-2 bg-blue-600 w-[40%] p-2 mx-auto text-white">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FileList;
