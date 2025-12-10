import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MobileSidebar from "./components/MobileSidebar.jsx";
import StudentSidebar from "./components/StudentSidebar.jsx";
import StudentMobileSidebar from "./components/StudentMobileSidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reports from "./pages/Reports.jsx";
import Graph from "./pages/Graph.jsx";
import Cities from "./pages/MasterData/City.jsx";
import States from "./pages/MasterData/State.jsx";
import Institute from "./pages/MasterData/Institute.jsx";
import Branch from "./pages/MasterData/Branch.jsx";
import School from "./pages/MasterData/School.jsx";
import Board from "./pages/MasterData/Board.jsx";
import ClassPage from "./pages/MasterData/Class.jsx";
import Division from "./pages/MasterData/Division";
import Academicyear from "./pages/MasterData/Academicyear";
import Emotion from "./pages/MasterData/Emotion";
import Zone from "./pages/MasterData/Zone";
import LogMoodMaster from "./pages/MasterData/LogMood";
import Category from "./pages/MasterData/Category";
import SubCategory from "./pages/MasterData/SubCategory";
import Impact from "./pages/MasterData/Impact";
import Pleasantness from "./pages/MasterData/Pleasantness";
// Import Auth pages
import Login from "./pages/Auth/Login";
import StudentLogin from "./pages/Auth/StudentLogin";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Countries from "./pages/MasterData/Countries.jsx";
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
          {isStudentRoute ? <StudentSidebar /> : <Sidebar />}
        </div>
        {/* Mobile Sidebar - Conditional based on route */}
        {isStudentRoute ? (
          <StudentMobileSidebar
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
