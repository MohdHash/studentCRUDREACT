import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",  // Match property name with backend model
    department: "",
    dob: "",          // Make sure this is in a valid date format (YYYY-MM-DD)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Ensure dob is in correct format if needed (YYYY-MM-DD)
      const formattedData = {
        ...formData,
        dob: new Date(formData.dob).toISOString().split("T")[0],  // Formatting date
      };

      await axios.post("https://localhost:7110/api/Auth/register", formattedData);
      navigate("/login");
    } catch (error) {
      toast("Error during Registration");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          {/* Form Fields */}
          {["name", "email", "password", "phoneNumber", "department", "dob"].map((field, idx) => (
            <div className="mb-4" key={idx}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : field === "dob" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
