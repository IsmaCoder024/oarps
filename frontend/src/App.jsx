//
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import UserManagement from "./pages/Admin/UserManagement";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import CreateActivity from "./pages/Manager/CreateActivity";
import AssignedActivity from "./pages/HeadOfDepartment/AssignedActivity";
import AssignTask from "./pages/HeadOfDepartment/AssignTask";
import MonitorTask from "./pages/HeadOfDepartment/MonitorTask";
import CreateDepartment from "./pages/Admin/CreateDepartment";
import AssignedTask from "./pages/Staff/AssignedTask";
import { Monitor } from "lucide-react";

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route element={<ProtectedRoute />}>
        {/*user routes*/}
        <Route path="/dashboard" element={<Dashboard />}></Route>

        {/*admin routes*/}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/userManagement" element={<UserManagement />}></Route>
        <Route path="/createDepartment" element={<CreateDepartment />}></Route>

        {/*manager routes*/}
        <Route path="/createActivity" element={<CreateActivity />}></Route>

        {/*hod routes*/}
        <Route path="/assignedActivity" element={<AssignedActivity />}></Route>
        <Route
          path="/assignedActivity/:activityId/assignTask"
          element={<AssignTask />}
        />
        <Route path="/monitorTask" element={<MonitorTask />}></Route>

        {/*staff routes*/}
        <Route path="/assignedTask" element={<AssignedTask />}></Route>
      </Route>
    </Routes>
  );
}
