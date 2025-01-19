import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";

// import Reports from "./pages/Reports";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />

      {/* <Route path="/reports" element={<Reports />} /> */}
    </Routes>
  </Router>
);

export default App;
