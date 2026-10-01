import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";
import { Star } from "lucide-react"
import "./MonitorTask.css";

const getStatusClass = (status) => {
  const normalizedStatus = String(status ?? "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  if (normalizedStatus === "completed") return "completed";
  if (["cancelled", "canceled", "incomplete"].includes(normalizedStatus)) {
    return "attention";
  }

  return "pending";
};

export default function MonitorTask() {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const [openSectionId, setOpenSectionId] = useState(null);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const response = await api.get("/api/getAssignments");
        setAssignments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };

    getAssignments();
  }, []);

  const [form, SetForm] = useState({
    remarks: "",
  });

  const handleChange = (e) => {
    SetForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (assignmentId) => {
    // preventDefault();

    if (rating < 1) {
      setError("Please select a rating");
      return;
    }

    try {
      const response = await api.patch(`/api/remarks/${assignmentId}`, {
        ...form,
        rating,
      });
      console.log(response.data);
      setMessage(response.data.message);
      navigate("/monitorTask");
    } catch (error) {
      console.error(error.response?.data);
      setError(error.response?.data?.error);
    }
  };

  return (
    <>
      <Header />
      <main className="monitor-task-page">
        <header className="monitor-task-heading">
          <p>Department workspace</p>
          <h1>Monitor tasks</h1>
        </header>
        {assignments.map((assignment) => (
          <article className="monitor-task-card" key={assignment.id}>
            <section className="monitor-task-summary">
              <h3>{assignment.task.title}</h3>
              <li>
                <span>Assigned to</span> {assignment?.assignee.f_name}{" "}
                {assignment?.assignee.l_name}
              </li>
              <li><span>Due date</span> {assignment?.task.end_date}</li>
              <li>
                <span>Status</span>
                <span className={`task-status task-status--${getStatusClass(assignment.status)}`}>
                  {assignment.status}
                </span>
              </li>
              {/* <li>{assignment.task.title}</li> */}
              <li><span>Remarks</span> {assignment?.remarks || "None"}</li>
            </section>
            <button
              className="monitor-task-toggle"
              onClick={() =>
                setOpenSectionId((currentId) =>
                  currentId === assignment.id ? null : assignment.id,
                )
              }
            >
              {openSectionId === assignment.id ? "Hide" : "More"}
            </button>

            {openSectionId === assignment.id && (
              <section className="monitor-task-review">
                

                <div
                  className="star-container"
                  onMouseLeave={() => setHoverRating(0)}
                  role="group"
                  aria-label="Rate from 1 to 5 stars"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-button ${
                        star <= (hoverRating || rating) ? "active" : ""
                      }`}
                      onClick={() => {
                        setRating(star);
                        setError("");
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      aria-label={`${star} out of 5 stars`}
                      aria-pressed={rating === star}
                    >
                      <Star />
                    </button>
                  ))}
                </div>
 
                <p className="rating-label">
                  {rating > 0
                    ? ratingLabels[hoverRating || rating]
                    : "No rating selected"}
                </p>

                <div className="monitor-task-remarks">
                  <label>Remarks</label>
                  <input
                    id="remarks"
                    type="text"
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>

                {error && (
                  <p className="rating-error" role="alert">
                    {error}
                  </p>
                )}

                <button className="submit-rating" onClick={() => handleSubmit(assignment.id)}>
                  Submit
                </button>
              </section>
            )}
          </article>
        ))}
        {assignments.length === 0 && (
          <p className="monitor-task-empty">No task assignments to monitor.</p>
        )}
      </main>
    </>
  );
}
