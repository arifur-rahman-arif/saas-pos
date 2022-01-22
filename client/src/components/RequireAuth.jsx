import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/loader/Loader";
import { useVerifySessionMutation } from "../services/auth";
import Cookies from "js-cookie";

const RequireAuth = ({ children }) => {
    let location = useLocation();

    const [sessionCaller, sessionArgs] = useVerifySessionMutation();
    const [authenticated, setAuthenticated] = useState(false);
    const [requestComplete, setRequestComplete] = useState(false);

    useEffect(() => {
        if (!Cookies.get("userID")) {
            sessionCaller();
        } else {
            setAuthenticated(true);
            setRequestComplete(true);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (sessionArgs.isSuccess) {
            setAuthenticated(true);
            setRequestComplete(true);
        }

        if (sessionArgs.isError) {
            setRequestComplete(true);
        }
    }, [sessionArgs]);

    // If the ajax request is complete and user is authenticated than process with next component
    if (requestComplete) {
        if (!authenticated) {
            return <Navigate to="/login" state={{ from: location }} />;
        }
        return children;
    }

    return (
        <>
            <Loader />
        </>
    );
};

export default RequireAuth;
