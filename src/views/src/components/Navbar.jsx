import React from "react";

import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="border-2">
      <div class=" flex space-x-7 text-[25px] mx-4">
              <Link className="hover:text-blue-600 " to="/register">Register</Link>
              <Link  className="hover:text-blue-600" to="/login">Login</Link>
              <Link className="hover:text-blue-600" to="/upload">Upload</Link>
        </div>
    </div>
  );
};

export default Navbar;
