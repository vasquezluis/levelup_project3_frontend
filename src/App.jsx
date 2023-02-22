import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// * components
import Sidebar from "./components/_partials/SideBar";
import Navbar from "./components/_partials/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// * pages
import Index from "./pages/public/Index";
import SignUser from "./pages/public/SignUser";
import CinemaListings from "./pages/public/CinemaListings";
import UserDashboard from "./pages/private/UserDashboard";
import AdminDashboard from "./pages/private/AdminDashboard";
import MoviePage from "./pages/public/MoviePage";

// * subpages

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    // request done
    setUser({
      id: 1,
      name: "john",
      permission: ["admin"],
      roles: ["normal"],
    });
  };

  const logout = () => setUser(null);
  const activeMenu = true;

  return (
    <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        {/* sidebar control */}
        {activeMenu ? (
          <div className="w-72 fixed dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        {/* Right side div */}
        <div
          className={`dark:bg-main-bg bg-gray-200 min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          {/* navbar div */}
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>

          {/* Routing */}
          <div>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />
              <Route path="/login" element={<SignUser />} />

              <Route path="/cartelera/:id" element={<MoviePage />} />
              <Route path="/cartelera" element={<CinemaListings />} />

              {/* Private pages */}
              <Route path="/admindash" element={<AdminDashboard />} />
              <Route path="/userdash" element={<UserDashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
