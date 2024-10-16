// src/components/AllStudents.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast , ToastContainer } from "react-toastify";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
    const token = localStorage.getItem("token");
    

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://localhost:7110/api/Students",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        setStudents(response.data);
      } catch (error) {
        alert("Error fetching students");
      }
    };
    fetchStudents();
  }, []);

  if(!token){
    toast("User not logged in" , 2000);
    navigate("/login");
    return;
}

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phoneNumber}</p>
            <p>Department: {student.department}</p>
            <p>Date of Birth: {student.dob}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;
