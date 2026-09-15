//

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import UserManagement from "./pages/Admin/UserManagement";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import CreateActivity from "./pages/Manager/CreateActivity";

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

        {/*manager routes*/}
        <Route path="/createActivity" element={<CreateActivity />}></Route>
      </Route>
    </Routes>
  );
}
