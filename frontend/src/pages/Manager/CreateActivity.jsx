import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";

export default function CreateActivity() {
  const [form, SetForm] = useState({
    title: "",
    description: "",
    branch_id: "",
    department_id: "",
    start_date: "",
    end_date: "",
    priority: "",
    remarks: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getBranches = async () => {
      try {
        const response = await api.get("/api/branches");
        setBranches(response.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    const getDepartments = async () => {
      try {
        const response = await api.get("/api/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error(error.response?.data);
      }
    };

    getBranches();
    getDepartments();
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
      const response = await api.post("/api/createActivity", form);
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
          {message && <p className="login-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="register-field">
              <label className="register-field-label">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder=""
                required
              />

              <label className="register-field-label">Description</label>
              <input
              nullable="true"
                id="description"
                type="textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder=""
                required
              />

              <label className="register-field-label" htmlFor="branch">
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={form.branch}
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
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>

              <label className="register-field-label" htmlFor="department">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                required
              >
                <option value="">How prior is the activity</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <label className="">Start date</label>
              <input
                id="start_date"
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                placeholder=""
                required
              />

              <label className="">End date</label>
              <input
                id="end_date"
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                placeholder=""
                required
              />

              <label className="">Remarks</label>
              <input
                id="remarks"
                type="textarea"
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder=""
                required
              />

              <button className="register-submit" type="submit">
                Initiate Activity
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
