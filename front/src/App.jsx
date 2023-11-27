import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/login/login";
import RouteGuard from "../helpers/routeGuard";

import Home from "../views/home/home";
import setAuthToken from "../helpers/interceptor";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  return (
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RouteGuard />}>
              <Route path="/" element={<Home />} />
          </Route>
            <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  )
}

export default App
