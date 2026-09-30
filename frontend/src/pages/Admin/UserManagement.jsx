import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserManagement.css";
import Header from "../../templates/Header";

const emptyForm = {
  f_name: "",
  m_name: "",
  l_name: "",
  phone: "",
  email: "",
  branch: "",
  department: "",
  title: "",
  password: "",
  password_confirmation: "",
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const selectedUser = editingUser;

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/getUsers");
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error.response?.data || error);
      setUsers([]);
      setMessage("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  const getBranches = async () => {
    try {
      const response = await api.get("/api/branches");
      setBranches(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await api.get("/api/departments");
      setDepartments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  useEffect(() => {
    getUsers();
    getBranches();
    getDepartments();
  }, []);

  const openEdit = (user) => {
    setMessage("");
    setEditingUser(user);
    setForm({
      f_name: user.f_name ?? "",
      m_name: user.m_name ?? "",
      l_name: user.l_name ?? "",
      phone: user.phone ?? "",
      email: user.email ?? "",
      branch: user.branch ?? "",
      department: user.department ?? "",
      title: user.title ?? "",
      password: "",
      password_confirmation: "",
    });
  };

  const closeEdit = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      await api.put(`/api/editUser/${selectedUser.id}`, form);
      await getUsers();
      closeEdit();
      setMessage("User updated successfully.");
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage(
        error.response?.data?.message || "Unable to update the selected user.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (userId) => {
    const shouldDelete = window.confirm("Delete this user permanently?");

    if (!shouldDelete) {
      return;
    }

    try {
      await api.delete(`/api/deleteUser/${userId}`);
      await getUsers();
      setMessage("User deleted successfully.");
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage(error.response?.data?.message || "Unable to delete user.");
    }
  };

  return (
    <div className="page">
    <Header/>
    <div className="user-management">
      
      <div className="user-management__header">
        <h1>User Management</h1>
      </div>

      {message ? (
        <div className="user-management__message">{message}</div>
      ) : null}

      {loading ? (
        <p className="user-management__state">Loading users...</p>
      ) : users.length > 0 ? (
        <div className="user-management__list">
          {users.map((user) => (
            <article className="user-card" key={user.id}>
              <div className="user-card__details">
                <h2>
                  {user.f_name} {user.l_name}
                </h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.branch} - Branch</p>
                <p>{user.title}, {user.department}</p>
              </div>

              <div className="user-card__actions">
                <button
                  type="button"
                  className="user-card__button user-card__button--edit"
                  onClick={() => openEdit(user)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="user-card__button user-card__button--delete"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="user-management__state">No users found.</p>
      )}

      {selectedUser ? (
        <div className="user-edit-modal" onClick={closeEdit}>
          <div
            className="user-edit-modal__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="user-edit-modal__header">
              <div>
                <h2>Edit User</h2>
                <p>
                  Update the fields below for {selectedUser.f_name}{" "}
                  {selectedUser.l_name}.
                </p>
              </div>

              <button
                type="button"
                className="user-edit-modal__close"
                onClick={closeEdit}
                aria-label="Close edit dialog"
              >
                ×
              </button>
            </div>

            <form className="user-edit-form" onSubmit={handleSubmit}>
              <div className="user-edit-form__grid user-edit-form__grid--3">
                <label>
                  First Name
                  <input
                    type="text"
                    name="f_name"
                    value={form.f_name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Middle Name
                  <input
                    type="text"
                    name="m_name"
                    value={form.m_name}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Last Name
                  <input
                    type="text"
                    name="l_name"
                    value={form.l_name}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="user-edit-form__grid user-edit-form__grid--2">
                <label>
                  Phone
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="user-edit-form__grid user-edit-form__grid--2">
                <label>
                  Branch
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.name}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Department
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="user-edit-form__grid user-edit-form__grid--2">
                <label>
                  Title
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="user-edit-form__grid user-edit-form__grid--2">
                <label>
                  New Password
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                  />
                </label>

                <label>
                  Confirm Password
                  <input
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    placeholder="Repeat the new password"
                  />
                </label>
              </div>

              <div className="user-edit-form__actions">
                <button
                  type="button"
                  className="user-edit-form__button user-edit-form__button--secondary"
                  onClick={closeEdit}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="user-edit-form__button user-edit-form__button--primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
    </div>
  );
}
