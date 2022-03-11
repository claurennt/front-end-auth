import { Navigate } from "react-router-dom";

//Protected Route wrapper that renders its nested children if a token exists else it redirects to the login page
const ProtectedRoute = ({ children, currentUser }) => {
  return currentUser ? children : <Navigate to="/auth" replace />;
};
export default ProtectedRoute;
