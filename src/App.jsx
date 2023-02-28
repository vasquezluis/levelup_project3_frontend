import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// * components
import Sidebar from "./components/_partials/SideBar";
import Navbar from "./components/_partials/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// * pages
import Index from "./pages/public/Index";
import CinemaListings from "./pages/public/CinemaListings";
import UserDashboard from "./pages/private/UserDashboard";
import AdminDashboard from "./pages/private/AdminDashboard";
import MoviePage from "./pages/public/MoviePage";
import LogIn from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";

// * global data
import { setUser } from "./reducers/userSlice";
import { getTokenFromLocalStorage } from "./libs/axios";

// * subpages

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);

      // ? give axios the token from operations
      getTokenFromLocalStorage(`${user.token}`);

      dispatch(
        setUser({
          id: user.userData.id,
          user: user.userData.user,
          permissions: user.userData.permissions,
          roles: user.userData.roles,
        })
      );
    }
  }, []);

  const user = useSelector((state) => state.user);

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
            {/* <button className="bg-green-300 p-2" onClick={login}>
              Log in
            </button>

            <button className="bg-green-300 p-2" onClick={logout}>
              Log out
            </button> */}
          </div>

          {/* Routing */}
          <div>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />

              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/cartelera/:id" element={<MoviePage />} />
              <Route path="/cartelera" element={<CinemaListings />} />

              {/* Private pages | admin role */}
              <Route
                path="/admindash"
                element={
                  <ProtectedRoute
                    isAllowed={!!user && user.roles.includes("admin")}
                    redirecTo="/"
                  >
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              ></Route>

              {/* Private page | user role */}
              <Route
                path="/userdash"
                element={
                  <ProtectedRoute
                    isAllowed={
                      !!user &&
                      (user.roles.includes("user") ||
                        user.roles.includes("admin"))
                    }
                    redirecTo="/"
                  >
                    <UserDashboard />
                  </ProtectedRoute>
                }
              ></Route>

              {/* Not Found */}
              <Route path="/*" element={<p>Página no encontrada</p>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
