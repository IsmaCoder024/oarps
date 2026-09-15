import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "../templates/Header.jsx";

export default function Dashboard() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/logout");

      setUser(null);

      console.log("Logged out");

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
    }
  };
  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sign Out</button>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
