import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import RequireAuth from "./routes/RequireAuth";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";
import ForgotPassword from "./screens/forgot-password/ForgotPassword";
import NotFound from "./screens/NotFound";
import ResetPassword from "./screens/reset-password/ResetPassword";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
