import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";
import "../Auth/Register.css";

export default function CreateDepartment() {
  const [form, SetForm] = useState({
    name: "",
    description: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  ;

  const handleChange = (e) => {
    SetForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/createBranch", form);
      console.log(response.data);
      await setMessage(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data);
      setError(error.response?.data?.error);
    }
  };

  return (
    <>
      <Header />
      <div className="register-page">
        <div className="register-card">
          <h1 className="register-title">Create your account</h1>
          <br />
          {message && <p className="login-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            

              
                <div className="register-field">
                  <label className="register-field-label" htmlFor="f_name">
                    Branch Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>

                <div className="register-field">
                  <label className="register-field-label" htmlFor="m_name">
                    Description
                  </label>
                  <input
                    id="description"
                    type="textarea"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>

                
           

            <section className="register-section">

              <div className="register-row register-row-2">
                <div className="register-field">
                  <label className="register-field-label" htmlFor="branch">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>

              </div>
            </section>

            
            <button className="register-submit" type="submit">
              Create Branch
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
