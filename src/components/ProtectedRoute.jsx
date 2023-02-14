import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirecTo = "/", children }) {
  if (!isAllowed) return <Navigate to={redirecTo} />;

  console.log(isAllowed);

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
