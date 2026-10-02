import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import brandLogo from "../../assets/MyLogo.jpeg";
import Header from "../../templates/Header.jsx";
import Footer from "../../templates/Footer.jsx";
import "./Register.css";


export default function Register() {
  const [form, SetForm] = useState({
    f_name: "",
    m_name: "",
    l_name: "",
    phone: "",
    email: "",
    branch: "",
    department: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await api.get("/api/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    const getBranches = async () => {
      try {
        const response = await api.get("/api/branches");
        setBranches(response.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    getDepartments();
    getBranches();
  }, []);

  const handleChange = (e) => {
    SetForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/register", form);
      console.log(response.data);
      await setMessage(response.data.message);

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
      setError(error.response?.data?.error);
    }
  };

  return (
    <>
      <Header />
      <main className="register-page">
        <div className="register-card">
          <h1 className="register-title">Create your account</h1>
          <p className="register-signin">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <br />
          {message && <p className="login-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <section className="register-section">
              <div className="register-section-label">Personal Information</div>
              <div className="register-divider" />

              <div className="register-row register-row-3">
                <div className="register-field">
                  <label className="register-field-label" htmlFor="f_name">
                    First Name
                  </label>
                  <input
                    id="f_name"
                    type="text"
                    name="f_name"
                    value={form.f_name}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>

                <div className="register-field">
                  <label className="register-field-label" htmlFor="m_name">
                    Middle Name
                  </label>
                  <input
                    id="m_name"
                    type="text"
                    name="m_name"
                    value={form.m_name}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>

                <div className="register-field">
                  <label className="register-field-label" htmlFor="l_name">
                    Last Name
                  </label>
                  <input
                    id="l_name"
                    type="text"
                    name="l_name"
                    value={form.l_name}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div className="register-row register-row-2">
                <div className="register-field">
                  <label className="register-field-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>

                <div className="register-field">
                  <label className="register-field-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0700000000"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="register-section">
              <div className="register-section-label">
                Organization & Placement
              </div>
              <div className="register-divider" />

              <div className="register-row register-row-2">
                <div className="register-field">
                  <label className="register-field-label" htmlFor="branch">
                    Branch Location
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="Main">Main</option>
                    <option value="Morogoro">Morogoro</option>
                    <option value="Dodoma">Dodoma</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.name}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="register-field">
                  <label className="register-field-label" htmlFor="department">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Procurement">Procurement</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="ICT">ICT</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="register-section">
              <div className="register-section-label">Security Credentials</div>
              <div className="register-divider" />

              <div className="register-row register-row-2">
                <div className="register-field">
                  <label className="register-field-label" htmlFor="password">
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="register-field">
                  <label
                    className="register-field-label"
                    htmlFor="password_confirmation"
                  >
                    Confirm Password
                  </label>
                  <div className="password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password_confirmation"
                      value={form.password_confirmation}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <button className="register-submit" type="submit">
              Register Account
            </button>
          </form>
        </div>
        <aside className="register-brand">
          <img src={brandLogo} alt="Takawedo Beverages Distribution" />
          <p className="register-brand__eyebrow">Join the team</p>
          <h2>Good work is shared.</h2>
          <p className="register-brand__copy">
            Create your account to get connected with your branch and
            department.
          </p>
        </aside>
      </main>
      <Footer/>
    </>
  );
}
