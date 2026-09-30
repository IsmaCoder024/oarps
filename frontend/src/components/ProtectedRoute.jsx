import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../templates/Loading.jsx';

function ProtectedRoute({ allowedRoles }) {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading isLoading={loading} message="Loading data..." />;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(String(user.role ?? '').toLowerCase())
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;