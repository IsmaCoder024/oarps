import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "./../../context/AuthContext.jsx";
import brandLogo from "../../assets/MyLogo.jpeg";
import Header from "../../templates/Header.jsx";
import Loading from "../../templates/Loading.jsx";
import "./Login.css";

export default function Login() {
  const [form, SetForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getUser } = useAuth();

  const handleChange = (e) => {
    SetForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/login", form);

        // Save authentication token
        localStorage.setItem("auth_token", response.data.token);

        setMessage(response.data.message);

        await getUser();

        const from = location.state?.from?.pathname || "/dashboard";

        navigate(from, { replace: true });

    } catch (error) {
        setError(
            error.response?.data?.error || "Login failed"
        );
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Loading isLoading={loading} message="Authenticating..." />

      <main className="login-page">
        <aside className="login-brand">
          <img src={brandLogo} alt="Takawedo Beverages Distribution" />
          <p className="login-brand__eyebrow">Takawedo Beverages</p>
          <h2>Good to have you back.</h2>
          <p className="login-brand__copy">
            Sign in to stay connected with your team and keep every detail
            moving.
          </p>
        </aside>
        <div className="login-card">
          <div className="flash-message" aria-live="polite">
            {message && <p className="login-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
          <h1 className="login-title">Welcome back</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-field-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane.doe@organization.com"
                required
              />
            </div>

            <div className="login-field">
              <label className="login-field-label" htmlFor="password">
                Password
              </label>
              <div className="password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button className="login-submit" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
