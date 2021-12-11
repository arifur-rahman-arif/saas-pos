import React from "react";
import { Navigate, useLocation } from "react-router";

const RequireAuth = ({ children }) => {
    let location = useLocation();

    let authenticated = false;

    if (authenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
