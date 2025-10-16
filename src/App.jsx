import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

// User Pages
import UserDashboard from "./pages/user/UserDashboardPage";
import AttendancePage from "./pages/user/AttendancePage";
import Achievement from "./pages/user/AchievementUserPage";
import Report from "./pages/user/ReportPage";

// HR Pages
import EmployeeApprovalPage from "./pages/hr/EmployeeApprovalPage";
import AttendanceAdminPage from "./pages/hr/AttendanceAdminPage";
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage";
import LeaveAdminPage from "./pages/hr/LeaveAdminPage";
import TaskAdmin from "./pages/hr/TaskAdmin";
import HRDashboard from "./pages/hr/HrDashboardPage";
import Letter from "./pages/hr/LetterPage";
import AchievementsPage from "./pages/hr/AchievementsPage";

// Components
import Tasks from "./components/user/UserTasks";
import Profile from "./components/user/UserProfile";
import Document from "./components/user/UserDocuments ";
import Employee from "./components/hr/Employee";
import HRDocuments from "./components/hr/HRDocuments";
import UserLeave from "./components/user/UserLeave";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default redirect from "/" to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* User Routes */}
          <Route path="/employee/dashboard" element={<UserDashboard />} />
          <Route path="/employee/attendance" element={<AttendancePage />} />
          <Route path="/employee/leave-requests" element={<UserLeave />} />
          <Route path="/employee/tasks" element={<Tasks />} />
          <Route path="/employee/profile" element={<Profile />} />
          <Route path="/employee/document" element={<Document />} />
          <Route path="/employee/achievement" element={<Achievement />} />
          <Route path="/employee/reports" element={<Report />} />

          {/* HR Routes */}
          <Route path="/hr/employee-approval" element={<EmployeeApprovalPage />} />
          <Route path="/hr/employee" element={<Employee />} />
          <Route path="/hr/achievements" element={<AchievementsPage />} />
          <Route path="/hr/letters" element={<Letter />} />
          <Route path="/hr/attendance" element={<AttendanceAdminPage />} />
          <Route path="/hr/attendance/:empId" element={<EmployeeAttendancePage />} />
          <Route path="/hr/leave-requests" element={<LeaveAdminPage />} />
          <Route path="/hr/tasks" element={<TaskAdmin />} />
          <Route path="/hr/HRdashboard" element={<HRDashboard />} />
          <Route path="/hr/documents" element={<HRDocuments />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
