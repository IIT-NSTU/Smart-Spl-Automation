import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const TPrivateRoute = ({ redirectPath = "/", children }) => {
  const state = useSelector((state) => state.auth);
  if (state.token === null) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!state.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (state.isTeacher === false) {
    return <Navigate to="/dashboard/student" replace />;
  } else {
    return children;
  }
};

export const SPrivateRoute = ({ redirectPath = "/", children }) => {
  const state = useSelector((state) => state.auth);
  if (state.token === null) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!state.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (state.isStudent === false) {
    return <Navigate to="/dashboard/teacher" replace />;
  } else {
    return children;
  }
};
