import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MobileSidebar from "./components/MobileSidebar.jsx";
import StudentSidebar from "./components/StudentSidebar.jsx";
import StudentMobileSidebar from "./components/StudentMobileSidebar.jsx";
import SchoolSidebar from "./components/SchoolSidebar.tsx";
import SchoolMobileSidebar from "./components/SchoolMobileSidebar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Reports from "./pages/Reports.tsx";
import Graph from "./pages/Graph.tsx";
import Cities from "./pages/MasterData/City.tsx";
import States from "./pages/MasterData/State.tsx";
import Institute from "./pages/MasterData/Institute.tsx";
import Branch from "./pages/MasterData/Branch.tsx";
import School from "./pages/MasterData/School.tsx";
import Board from "./pages/MasterData/Board.tsx";
import ClassPage from "./pages/MasterData/Class.tsx";
import Division from "./pages/MasterData/Division.tsx";
import Academicyear from "./pages/MasterData/Academicyear.tsx";
import Emotion from "./pages/MasterData/Emotion.tsx";
import Zone from "./pages/MasterData/Zone.tsx";
import LogMoodMaster from "./pages/MasterData/LogMood.tsx";
import Category from "./pages/MasterData/Category.tsx";
import SubCategory from "./pages/MasterData/SubCategory.tsx";
import Impact from "./pages/MasterData/Impact.tsx";
import Pleasantness from "./pages/MasterData/Pleasantness.tsx";
// Import Auth pages
import Login from "./pages/Auth/Login.tsx";
import StudentLogin from "./pages/Auth/StudentLogin.tsx";
import Register from "./pages/Auth/Register.tsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.tsx";
import ResetPassword from "./pages/Auth/ResetPassword.tsx";
import Countries from "./pages/MasterData/Countries.tsx";
// Import School pages
import SchoolDashboard from "./pages/School/SchoolDashboard.tsx";
import SchoolOverview from "./pages/School/Overview.tsx";
import AllStudents from "./pages/School/Students/AllStudents.tsx";
import StudentProfiles from "./pages/School/Students/StudentProfiles.tsx";
import StudentAttendance from "./pages/School/Students/StudentAttendance.tsx";
import StudentPerformance from "./pages/School/Students/StudentPerformance.tsx";
import Classes from "./pages/School/Academics/Classes.tsx";
import Divisions from "./pages/School/Academics/Divisions.tsx";
import Subjects from "./pages/School/Academics/Subjects.tsx";
import Timetable from "./pages/School/Academics/Timetable.tsx";
import AcademicYear from "./pages/School/Academics/AcademicYear.tsx";
import Examinations from "./pages/School/Academics/Examinations.tsx";
import Teachers from "./pages/School/Teachers.tsx";
import Assignments from "./pages/School/Assignments.tsx";
import Grades from "./pages/School/Grades.tsx";
import StudentReports from "./pages/School/Reports/StudentReports.tsx";
import MoodAnalytics from "./pages/School/Reports/MoodAnalytics.tsx";
import AttendanceReports from "./pages/School/Reports/AttendanceReports.tsx";
import PerformanceReports from "./pages/School/Reports/PerformanceReports.tsx";
import CustomReports from "./pages/School/Reports/CustomReports.tsx";
import SchoolCalendar from "./pages/School/Calendar.tsx";
import SchoolNotifications from "./pages/School/Notifications.tsx";
import Communications from "./pages/School/Communications.tsx";
import Documents from "./pages/School/Documents.tsx";
import Security from "./pages/School/Security.tsx";
import Billing from "./pages/School/Billing.tsx";
import SchoolProfile from "./pages/School/Settings/Profile.tsx";
import Users from "./pages/School/Settings/Users.tsx";
import Permissions from "./pages/School/Settings/Permissions.tsx";
import SettingsNotifications from "./pages/School/Settings/SettingsNotifications.tsx";
import BillingSettings from "./pages/School/Settings/BillingSettings.tsx";
// Import Student pages
import {
  StudentDashboard,
  StudentProfile,
  LogMood,
  MoodHistory,
  MoodOverview,
  Calendar,
  StreaksRewards,
  Referrals,
  Community,
  Notifications,
  PredefinedList,
} from "./pages/Student";

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const authRoutes = [
    "/login",
    "/student/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if current path is a student route
  const isStudentRoute = location.pathname.startsWith("/student");
  // Check if current path is a school route
  const isSchoolRoute = location.pathname.startsWith("/school");

  // Redirect to appropriate dashboard if user is already authenticated and trying to access auth pages
  if (isAuthenticated && authRoutes.includes(location.pathname)) {
    if (location.pathname === "/student/login") {
      return <Navigate to="/student/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  if (authRoutes.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <ProtectedRoute>
      <div style={{ display: "flex", position: "relative" }}>
        {/* Desktop Sidebar - Conditional based on route */}
        <div className="sidebar-desktop">
          {isStudentRoute ? (
            <StudentSidebar />
          ) : isSchoolRoute ? (
            <SchoolSidebar />
          ) : (
            <Sidebar />
          )}
        </div>
        {/* Mobile Sidebar - Conditional based on route */}
        {isStudentRoute ? (
          <StudentMobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        ) : isSchoolRoute ? (
          <SchoolMobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        ) : (
          <MobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}
        <div style={{ flex: 1 }}>
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/master/city" element={<Cities />} />
            <Route path="/master/state" element={<States />} />
            <Route path="master/country" element={<Countries />} />
            <Route path="master/institute" element={<Institute />} />
            <Route path="master/branch" element={<Branch />} />
            <Route path="/master/school" element={<School />} />
            <Route path="/master/board" element={<Board />} />
            <Route path="/master/class" element={<ClassPage />} />
            <Route path="/master/division" element={<Division />} />
            <Route path="/master/academicyear" element={<Academicyear />} />
            <Route path="/master/emotion" element={<Emotion />} />
            <Route path="/master/zone" element={<Zone />} />
            <Route path="/master/logmood" element={<LogMoodMaster />} />
            <Route path="/master/category" element={<Category />} />
            <Route path="/master/subcategory" element={<SubCategory />} />
            <Route path="/master/impact" element={<Impact />} />
            <Route path="/master/pleasantness" element={<Pleasantness />} />

            {/* School Pages */}
            <Route path="/school/dashboard" element={<SchoolDashboard />} />
            <Route path="/school/overview" element={<SchoolOverview />} />
            <Route path="/school/students" element={<AllStudents />} />
            <Route path="/school/students/profiles" element={<StudentProfiles />} />
            <Route path="/school/students/attendance" element={<StudentAttendance />} />
            <Route path="/school/students/performance" element={<StudentPerformance />} />
            <Route path="/school/academics/classes" element={<Classes />} />
            <Route path="/school/academics/divisions" element={<Divisions />} />
            <Route path="/school/academics/subjects" element={<Subjects />} />
            <Route path="/school/academics/timetable" element={<Timetable />} />
            <Route path="/school/academics/academic-year" element={<AcademicYear />} />
            <Route path="/school/academics/examinations" element={<Examinations />} />
            <Route path="/school/teachers" element={<Teachers />} />
            <Route path="/school/assignments" element={<Assignments />} />
            <Route path="/school/grades" element={<Grades />} />
            <Route path="/school/reports/students" element={<StudentReports />} />
            <Route path="/school/reports/mood-analytics" element={<MoodAnalytics />} />
            <Route path="/school/reports/attendance" element={<AttendanceReports />} />
            <Route path="/school/reports/performance" element={<PerformanceReports />} />
            <Route path="/school/reports/custom" element={<CustomReports />} />
            <Route path="/school/calendar" element={<SchoolCalendar />} />
            <Route path="/school/notifications" element={<SchoolNotifications />} />
            <Route path="/school/communications" element={<Communications />} />
            <Route path="/school/documents" element={<Documents />} />
            <Route path="/school/security" element={<Security />} />
            <Route path="/school/billing" element={<Billing />} />
            <Route path="/school/settings/profile" element={<SchoolProfile />} />
            <Route path="/school/settings/users" element={<Users />} />
            <Route path="/school/settings/permissions" element={<Permissions />} />
            <Route path="/school/settings/notifications" element={<SettingsNotifications />} />
            <Route path="/school/settings/billing" element={<BillingSettings />} />

            {/* Student Pages */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/log-mood" element={<LogMood />} />
            <Route path="/student/mood-history" element={<MoodHistory />} />
            <Route path="/student/mood-overview" element={<MoodOverview />} />
            <Route path="/student/calendar" element={<Calendar />} />
            <Route
              path="/student/streaks-rewards"
              element={<StreaksRewards />}
            />
            <Route path="/student/referrals" element={<Referrals />} />
            <Route path="/student/community" element={<Community />} />
            <Route path="/student/notifications" element={<Notifications />} />
            <Route
              path="/student/predefined-list"
              element={<PredefinedList />}
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
