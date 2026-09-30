import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";

export default function AssignedTask() {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const response = await api.get("/api/assignedTask");
        setAssignments(response.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    getAssignments();
  }, []);

  const updateAssignmentStatus = async (assignmentId, status) => {
    try {
      const response = await api.patch(`/api/assignedTask/${assignmentId}`, {
        status,
      });

      setAssignments((current) =>
        current.map((assignment) =>
          assignment.id === assignmentId ? response.data : assignment,
        )
      );

      setMessage('Status updated to ' .status);
    } catch (error) {
      console.error(error.response?.data ?? error.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        {message && <p>{message}</p>}
        {assignments.map((assignment, index) => (
          <div key={assignment.id}>
            <ul>
              <li>Title : {assignment.task.title}</li>
              <li>Satus : {assignment.status}</li>
              <li>Assigned by: {assignment.assignor.f_name}</li>
            </ul>
            {assignment.status === "Assigned" ? (
              <button
                onClick={() =>
                  updateAssignmentStatus(assignment.id, "In progress")
                }
              >
                Confirm Assignment
              </button>
            ) : ( 
              <button
                onClick={() =>
                  updateAssignmentStatus(assignment.id, "Completed")
                }
              >
                Submit
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
