import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";

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
      <div>
        {activities.map((activity, index) => (
          <div key={activity.id}>
            <ul>
              <li>{activity.title}</li>
              <li>{activity.start_date}</li>
              <li>{activity.end_date}</li>
              <li>{activity.department.name}</li>
              <li>
                Assigned by: {activity.hod.f_name} {activity.hod.l_name}
              </li>
            </ul>

            <button
              onClick={() =>
                navigate(`/assignedActivity/${activity.id}/assignTask`)
              }
            >
              Assign Tasks
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
