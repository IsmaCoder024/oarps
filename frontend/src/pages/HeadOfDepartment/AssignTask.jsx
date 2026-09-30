import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";

export default function AssignTask() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    activity_id: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const searchUsers = async () => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }

    try {
      setSearching(true);

      const response = await api.get(`/api/users/search?q=${search}`);

      setUsers(response.data);
    } catch (error) {
      console.error(error.response?.data);
      setMessage("Failed to search users");
    } finally {
      setSearching(false);
    }
  };

  const addUser = (user) => {
    const alreadySelected = selectedUsers.some(
      (selectedUser) => selectedUser.id === user.id,
    );

    if (alreadySelected) {
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const removeUser = (userId) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser.id !== userId),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUsers.length === 0) {
      setMessage("Please select at least one user");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/api/activities/${activityId}/tasks`, {
        activity_id: activityId,
        title: form.title,
        description: form.description,
        start_date: form.start_date,
        end_date: form.end_date,
        assigned_to: selectedUsers.map((user) => user.id),
      });

      setMessage("Task created and assigned successfully");

      setForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
      });

      setSearch("");
      setUsers([]);
      setSelectedUsers([]);

      navigate("/assignedActivity");
    } catch (error) {
      console.error(error.response?.data);
      setMessage(error.response?.data?.message || "Failed to assign task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div>
        {activityId}
        <h2>Create and Assign Task</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <section>
            <h3>Task details</h3>
            <div>
              <label>Task Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Start Date</label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End Date</label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
              />
            </div>
          </section>

          <section>
            <h3>Assign to users</h3>
            <div>
              <label>Search User</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by first name, last name or email"
              />

              <button type="button" onClick={searchUsers}>
                {searching ? "Searching..." : "Search"}
              </button>
            </div>

            <div>
              <h4>Search Results</h4>

              {users.map((user) => (
                <div key={user.id}>
                  <span>
                    {user.f_name} {user.l_name} - {user.email}
                  </span>

                  <button type="button" onClick={() => addUser(user)}>
                    Add
                  </button>
                </div>
              ))}
            </div>

            <div>
              <h4>Selected Users</h4>

              {selectedUsers.map((user) => (
                <div key={user.id}>
                  <span>
                    {user.f_name} {user.l_name} - {user.email}
                  </span>

                  <button type="button" onClick={() => removeUser(user.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <button type="submit" disabled={loading}>
            {loading ? "Assigning..." : "Create and Assign Task"}
          </button>
        </form>
      </div>
    </>
  );
}
