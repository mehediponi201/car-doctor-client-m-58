import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import swal from 'sweetalert';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (user?.email) {
        return children;
    }
    return <Navigate to={"/login"}>
        {
            swal("Please login to see your bookings collection")
        }
    </Navigate>
};

export default PrivateRoute;