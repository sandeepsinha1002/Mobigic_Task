import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      if (response.data.message === "exist") {
        const { token } = response.data;

        // Store the token in localStorage
        localStorage.setItem("token", token);

        navigate("/upload", { state: { id: username } });
      } else if (response.data === "notexist") {
        alert("User does not exist");
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.status === 401) {
        alert("Invalid username or password");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[22px] mb-10 font-bold">Login</h2>
      <form method="POST" className="flex flex-col space-y-4 w-[54%] mx-auto ">
        <div className="flex flex-col border-2 rounded-lg border-gray-400 hover:border-black p-1">
          <label htmlFor="" className="p-1 text-stone-400 ">
            Username
          </label>
          <input
            type="text"
            className="p-2 border-none outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col border-2 rounded-lg border-gray-400 hover:border-black p-1">
          <label htmlFor="" className="p-1 text-stone-400 ">
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
          type="submit"
          className="p-2 bg-blue-600 w-[10%] mx-auto "
          onClick={submit}
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
