// src/components/Header.js

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {

   const [needLogout , setNeedLogout] = useState(false);
    const location = useLocation();


    useEffect(()=>{
        const handleChange = () => {
            if(location.pathname === '/login' || location.pathname === '/register'){
               setNeedLogout(false);
            }else{
               setNeedLogout(true);
            }
          }
          handleChange();
    },[location.pathname])
   


  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center ">
      <div className="text-white font-bold text-xl">Student Management</div>
      <nav >
       {needLogout && <Link to="/login" className="text-white mr-4">Logout</Link>}
       { !needLogout && <Link to="/login" className="text-white mr-4">Login</Link>}
       { !needLogout && <Link to="/register" className="text-white">Register</Link> }
      </nav>
    </header>
  );


};

export default Header;
