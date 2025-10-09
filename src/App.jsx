import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Auth Pages
import LoginPage from './pages/auth/login'
import SignUpPage from './pages/auth/signup'

// User Pages
import UserDashboard from './pages/user/userDashboard'
import AttendancePage from './pages/user/attendance'
import LeavePage from './pages/user/leavePage'

// HR Pages
import EmployeeApprovalPage from './pages/hr/employeeApproval'
import AttendanceAdminPage from './pages/hr/attendancePage'
import EmployeeAttendancePage from './pages/employeeAttendance'
import LeaveAdminPage from './pages/hr/leavePage'
import TaskAdmin from './pages/hr/task'
import Tasks from './components/user/Tasks'
import Profile from './components/user/Profile'
import Document from './components/user/Document'
import HRDashboard from './pages/hr/HRDashboard'
import Employee from './components/hr/Employee'
import Achievements from './components/hr/Achievements'
import HRDocuments from './components/hr/Documents'
import Achievement from './pages/user/Achievements'
import Report from './pages/user/Report'
import Letter from './pages/hr/Letter'

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
          <Route path="/employee/leave-requests" element={<LeavePage />} />
          <Route path="/employee/tasks" element={<Tasks />} />
          <Route path="/employee/profile" element={<Profile />} />
          <Route path="/employee/document" element={<Document />} />
          <Route path='/employee/achievement' element={<Achievement/>}/>
          <Route path='/employee/reports' element={<Report/>} />

          {/* HR Routes */}
          <Route path="/hr/employee-approval" element={<EmployeeApprovalPage />} /> 
          <Route path='/hr/employee'  element={<Employee/>}/>
          <Route path='/hr/achievements'  element={<Achievements/>}/>
          <Route path='/hr/letters' element={<Letter/>} />
          <Route path="/hr/attendance" element={<AttendanceAdminPage />} />
          <Route path="/hr/attendance/:empId" element={<EmployeeAttendancePage />} />
          <Route path="/hr/leave-requests" element={<LeaveAdminPage />} />
          <Route path="/hr/tasks" element={<TaskAdmin />} />
          <Route path="/hr/HRdashboard" element={<HRDashboard />} />
          <Route path="/hr/Documents" element={<HRDocuments />} />
          

          {/* Fallback route if nothing matches */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
