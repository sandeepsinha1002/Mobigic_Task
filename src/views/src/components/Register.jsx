// Register.js
import React, { useState } from "react";
// import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password
      })
      .then(res=>
        {
          console.log(res)
          if(res.data==="exist")
          {
            alert("User already exists")
          }
          else if(res.data==="notexist")
          {
            navigate('/upload',{state:{id:username}})
          }
        })
        .catch(e=>{
          alert("Wrong Details")
          console.log(e);
        })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[22px] mb-10 font-bold">Register</h2>
      <form method="POST" className="flex flex-col space-y-4 w-[54%] mx-auto">
        <div className="flex flex-col border-2 rounded-lg border-gray-400 hover:border-black p-1">
          <label htmlFor="username" className="p-1 text-stone-400">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="p-2 border-none outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col border-2 rounded-lg border-gray-400 hover:border-black p-1">
          <label htmlFor="password" className="p-1 text-stone-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 border-none outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"  // Change type to "button" to prevent the form submission
          className="p-2 bg-blue-600 w-[10%] mx-auto"
          onClick={submit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
