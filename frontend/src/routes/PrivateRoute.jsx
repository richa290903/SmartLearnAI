import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;