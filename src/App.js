import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MobileSidebar from "./components/MobileSidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reports from "./pages/Reports.jsx";
import Graph from "./pages/Graph.jsx";
import Cities from "./pages/MasterData/City.jsx";
import States from "./pages/MasterData/State.jsx";
// import Countries from "./pages/MasterData/Country.jsx"; "./pages/MasterData/Country.jsx";
import Institute from "./pages/MasterData/Institute.jsx";
// import Createinstitute from "./pages/MasterData/Createinstitute.jsx";
import Branch from "./pages/MasterData/Branch.jsx";
import CreateBranch from "./pages/MasterData/CreateBranch.jsx";
import EditBranch from "./pages/MasterData/EditBranch.jsx";
import InstituteOverview from "./pages/MasterData/InstituteOverview.jsx";
import BranchOverview from "./pages/MasterData/BranchOverview.jsx";
import School from "./pages/MasterData/School.jsx";
import SchoolOverview from "./pages/MasterData/SchoolOverview.jsx";
import SchoolCreate from "./pages/MasterData/SchoolCreate.jsx";
import SchoolEdit from "./pages/MasterData/SchoolEdit.jsx";
import Board from "./pages/MasterData/Board.jsx";
import BoardOverview from "./pages/MasterData/BoardOverview.jsx";
import BoardCreate from "./pages/MasterData/BoardCreate.jsx";
import BoardEdit from "./pages/MasterData/BoardEdit.jsx";
import ClassPage from "./pages/MasterData/Class.jsx";
import ClassOverview from "./pages/MasterData/ClassOverview.jsx";
// import ClassCreate from "./pages/MasterData/ClassCreate.jsx";
import ClassEdit from "./pages/MasterData/ClassEdit.jsx";
import Division from "./pages/MasterData/Division";
import DivisionOverview from "./pages/MasterData/DivisionOverview";
import DivisionCreate from "./pages/MasterData/DivisionCreate";
import DivisionEdit from "./pages/MasterData/DivisionEdit";
import Academicyear from "./pages/MasterData/Academicyear";
import Emotion from "./pages/MasterData/Emotion";
import Zone from "./pages/MasterData/Zone";
import Category from "./pages/MasterData/Category";
import SubCategory from "./pages/MasterData/SubCategory";
import Impact from "./pages/MasterData/Impact";
import Pleasantness from "./pages/MasterData/Pleasantness";
import InstituteEdit from "./pages/MasterData/InstituteEdit";
// Import Auth pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
// import Count from "./pages/MasterData/Country.jsx";
import Countries from "./pages/MasterData/Countries.jsx";
// Import Student pages
import {
  StudentDashboard,
  StudentProfile,
  LogMood,
  MoodHistory,
  Calendar,
  StreaksRewards,
  Referrals,
  Community,
  Notifications,
} from "./pages/Student";

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to dashboard if user is already authenticated and trying to access auth pages
  if (isAuthenticated && authRoutes.includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (authRoutes.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
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
        {/* Desktop Sidebar */}
        <div className="sidebar-desktop">
          <Sidebar />
        </div>
        {/* Mobile Sidebar (only on mobile) */}
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
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
            {/* <Route path="/institute/create" element={<Createinstitute />} /> */}
            <Route path="master/branch" element={<Branch />} />
            <Route path="/branch/create" element={<CreateBranch />} />
            <Route path="/branch/edit/:id" element={<EditBranch />} />
            <Route
              path="/institute/overview/:id"
              element={<InstituteOverview />}
            />
            <Route path="/branch/overview/:id" element={<BranchOverview />} />
            <Route path="/master/school" element={<School />} />
            <Route path="/school/overview/:id" element={<SchoolOverview />} />
            <Route path="/school/create" element={<SchoolCreate />} />
            <Route path="/school/edit/:id" element={<SchoolEdit />} />
            <Route path="/master/board" element={<Board />} />
            <Route path="/board/overview/:id" element={<BoardOverview />} />
            <Route path="/board/create" element={<BoardCreate />} />
            <Route path="/board/edit/:id" element={<BoardEdit />} />
            <Route path="/master/class" element={<ClassPage />} />
            <Route path="/class/overview/:id" element={<ClassOverview />} />
            {/* <Route path="/class/create" element={<ClassCreate />} /> */}
            <Route path="/class/edit/:id" element={<ClassEdit />} />
            <Route path="/master/division" element={<Division />} />
            <Route
              path="/division/overview/:id"
              element={<DivisionOverview />}
            />

            <Route path="/division/create" element={<DivisionCreate />} />
            <Route path="/division/edit/:id" element={<DivisionEdit />} />
            <Route path="/master/academicyear" element={<Academicyear />} />
            <Route path="/master/emotion" element={<Emotion />} />
            <Route path="/master/zone" element={<Zone />} />
            <Route path="/master/category" element={<Category />} />
            <Route path="/master/subcategory" element={<SubCategory />} />
            <Route path="/master/impact" element={<Impact />} />
            <Route path="/master/pleasantness" element={<Pleasantness />} />
            <Route path="/institute/edit/:id" element={<InstituteEdit />} />

            {/* Student Pages */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/log-mood" element={<LogMood />} />
            <Route path="/student/mood-history" element={<MoodHistory />} />
            {/* <Route path="/student/calendar" element={<Calendar />} />
            <Route
              path="/student/streaks-rewards"
              element={<StreaksRewards />}
            />
            <Route path="/student/referrals" element={<Referrals />} />
            <Route path="/student/community" element={<Community />} />
            <Route path="/student/notifications" element={<Notifications />} /> */}

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
