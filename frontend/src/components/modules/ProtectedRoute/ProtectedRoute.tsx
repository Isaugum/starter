import {Navigate, Outlet} from "react-router";
import {useAuthStore} from "@store/auth.store.ts";

export function ProtectedRoute() {
    const loading = false;
    const {user, isAuthenticated} = useAuthStore();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || !isAuthenticated) {
        return <Navigate to="/auth/login" replace/>;
    }

    return <Outlet/>;
}
