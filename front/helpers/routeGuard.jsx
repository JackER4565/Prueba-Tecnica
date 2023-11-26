import { Navigate, Outlet } from 'react-router-dom';
 
const RouteGuard = () => {
    const token = localStorage.getItem('token');
 
    if (token) {
        return <Outlet />;
    }
 
    return <Navigate to="/login" />;

};
 
export default RouteGuard;