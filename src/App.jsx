import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// * components
import MainNavBar from "./components/_partials/MainNavBar";
import ProtectedRoute from "./components/ProtectedRoute";

// * pages
import Index from "./pages/public/Index";
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

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <div>
          <MainNavBar />

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </div>

        <div className="p-2 w-screen h-screen">
          <Routes>
            {/* Public Routes */}
            <Route index element={<Index />} />
            <Route path="/cartelera/:movieName" element={<MoviePage />} />
            <Route path="/cartelera" element={<CinemaListings />} />

            {/* Protected Routes | Outlet */}
            <Route element={<ProtectedRoute isAllowed={!!user} />}>
              <Route path="/profile" element={<UserDashboard />} />
            </Route>

            {/* Proyected Routes | children */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  isAllowed={!!user && user.permission.includes("admin")}
                  redirecTo="/"
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Not found */}
            <Route
              path="*"
              element={<p className="text-3xl text-black">Not Found</p>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
