import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../templates/Loading.jsx';

function ProtectedRoute() {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading isLoading={loading} message="Checking authentication..." />;
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

    return <Outlet />;
}

export default ProtectedRoute;