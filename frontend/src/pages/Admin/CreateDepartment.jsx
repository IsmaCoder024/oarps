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
    branch_id: "",
    hod_id: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hods, setHods] = useState([]);
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getHods = async () => {
      try {
        const response = await api.get("/api/hods");
        setHods(response.data);
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

    getHods();
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
      const response = await api.post("/api/createDepartment", form);
      console.log(response.data);
      await setMessage(response.data.message);

      navigate("/home");
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
                    Department Name
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
                    Branch Location
                  </label>
                  <select
                    id="branch_id"
                    name="branch_id"
                    value={form.branch_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="register-field">
                  <label className="register-field-label" htmlFor="department">
                    Head Of Department
                  </label>
                  <select
                    id="hod_id"
                    name="hod_id"
                    value={form.hod_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select HOD</option>
                    {hods.map((hod) => (
                      <option key={hod.id} value={hod.id}>
                        {hod.f_name} {hod.l_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            
            <button className="register-submit" type="submit">
              Create Department
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
