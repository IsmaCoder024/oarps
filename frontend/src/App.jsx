//
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import UserManagement from "./pages/Admin/UserManagement";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import CreateActivity from "./pages/Manager/CreateActivity";
import AssignedActivity from "./pages/HeadOfDepartment/AssignedActivity";
import CreateDepartment from "./pages/Admin/CreateDepartment";



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
        <Route path="/userManagement" element={<UserManagement />}></Route>
        <Route path="/createDepartment" element={<CreateDepartment />}></Route>

        {/*manager routes*/}
        <Route path="/createActivity" element={<CreateActivity />}></Route>

        {/*hod routes*/}
        <Route path="/assignedActivity" element={<AssignedActivity />}></Route>

      </Route>
    </Routes>
  );
}
