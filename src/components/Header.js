// src/components/Header.js
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Student Management</div>
      <nav>
        <Link to="/login" className="text-white mr-4">Login</Link>
        <Link to="/register" className="text-white">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
