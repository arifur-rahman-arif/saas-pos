import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import RequireAuth from "./routes/RequireAuth";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
