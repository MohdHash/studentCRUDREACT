import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();

  

  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("studentId"); // Retrieve studentId from local storage
    console.log(studentId);
  // Fetch student details by ID
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7110/api/Students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(response.data);
      } catch (error) {
        toast.error("Error fetching student details");
      }
    };
    fetchStudentDetails();
  }, [token, studentId]);

  // Update student details
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://localhost:7110/api/Students/${studentId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudent(response.data); // Update student details in state
      setEditing(false);
      toast.success("Updated successfully");
    } catch (error) {
      toast.error("Error updating details");
    }
  };

  // Delete student account
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7110/api/Students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("studentId"); // Remove student ID from local storage
      navigate("/login");
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Error deleting account");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      {student && (
        <div>
          {!editing ? (
            <div>
              <p>Name: {student.name}</p>
              <p>Email: {student.email}</p>
              <p>Phone: {student.phoneNumber}</p> {/* Adjusted to match your model */}
              <p>Department: {student.department}</p>
              <p>Date of Birth: {student.dob}</p>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setEditing(true)}
              >
                Edit Details
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          ) : (
            <div>
              {/* Editing Form */}
              {["name", "email", "phoneNumber", "department", "dob"].map((field, idx) => (
                <div className="mb-4" key={idx}>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    defaultValue={student[field]}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, [field]: e.target.value })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              ))}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}


      <div className="  font-bold rounded-md w-fit m-5 bg-blue-500 p-4 text-white transition-all ease-in  hover:bg-slate-50 hover:text-blue-300 hover:border-blue-950  ">
        <button onClick={()=>{navigate('/allStudents')}} >View All Students</button>
      </div>
    </div>

  );
};

export default StudentDashboard;
