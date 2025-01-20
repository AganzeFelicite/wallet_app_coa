import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import LoginPage from "./auth/LoginPage";
import SignupForm from "./auth/SignupForm";
import Navigation from "./auth/nav";

import ProtectedRoute from "./components/protectedRoutes";
import { AuthProvider } from "./auth/context/AuthContext";
import "./index.css";
import Banner from "./components/imageBanner";

const App: React.FC = () => (
  <Router>
    {" "}
    {/* Router should be at the top-level */}
    <AuthProvider>
      {" "}
      {/* AuthProvider inside Router */}
      {/* The Navigation component should be visible on every page */}
      <Navigation />
      {/* Main content */}
      <div className="container mx-auto mt-0 p-8">
        <Routes>
          {/* Protected route for Dashboard */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route path="/" element={<Banner />} />
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </AuthProvider>
  </Router>
);

export default App;
