import { Navigate, Outlet } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = () => {
  const [user, loading] = useAuthState(auth);

  if(loading) {
    return <div className="full-height">
    <Spinner
    animation="grow"
    role="status"
    className="center"
    variant="warning"
    >
    <span className='visually-hidden'>Loading...</span>
    </Spinner>
    </div>
  }
  if(!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default ProtectedRoute;