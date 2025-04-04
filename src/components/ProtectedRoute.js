// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ allowedRoles }) => {
//     const { user, loading } = useSelector((state) => state.auth);

//     if (loading) {
//         return <div className="loading-spinner">Loading...</div>; // Use a proper loading component
//     }

//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }

//     if (allowedRoles && !allowedRoles.includes(user?.role)) {
//         return <Navigate to="/not-authorized" replace />;
//     }

//     return <Outlet />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const LoadingSpinner = () => (
    <div className="loading-spinner">
        <span>Loading...</span>
    </div>
);

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useSelector((state) => state.auth);

    const isAuthorized = useMemo(() => {
        return allowedRoles ? allowedRoles.includes(user?.role) : true;
    }, [user, allowedRoles]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAuthorized) {
        return <Navigate to="/not-authorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
