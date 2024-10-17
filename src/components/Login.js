import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = ()=>{

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    const handleLogin = async (e) => {  
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7110/api/Auth/login", {
                email,
                password,
            });
            const {token} = response.data;

            const decodedToken = jwtDecode(token);
            const StudentId = decodedToken.StudentId;

            localStorage.setItem("token", token);
            localStorage.setItem("studentId", StudentId);
            toast("Logged in successfully");
            navigate("/dashboard");
        }catch(error){
            toast("Invalid credentials");
        }
    }


    return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-full max-w-sm">
            <form
              onSubmit={handleLogin}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      );
};

export default Login;