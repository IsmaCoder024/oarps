import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";
import "./AssignedActivity.css";

export default function AssignedActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await api.get("/api/assignedActivity");
        setActivities(response.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    getActivities();
  }, []);

  return (
    <>
      <Header />
      <main className="assigned-activity-page">
        <header className="assigned-activity-heading">
          <p>Department workspace</p>
          <h1>Assigned activities</h1>
        </header>
        <div className="assigned-activity-list">
          {activities.map((activity) => (
            <article className="activity-card" key={activity.id}>
              <ul className="activity-details">
                <li className="activity-title">{activity.title}</li>
                <li><span>Starts</span>{activity.start_date}</li>
                <li><span>Ends</span>{activity.end_date}</li>
                <li><span>Department</span>{activity.department.name}</li>
                <li>
                  <span>Assigned by</span>
                  {activity.hod.f_name} {activity.hod.l_name}
                </li>
              </ul>
              <button
                className="activity-action"
                onClick={() =>
                  navigate(`/assignedActivity/${activity.id}/assignTask`)
                }
              >
                Assign tasks
              </button>
            </article>
          ))}
          {activities.length === 0 && (
            <p className="activity-empty">No activities have been assigned yet.</p>
          )}
        </div>
      </main>
    </>
  );
}
