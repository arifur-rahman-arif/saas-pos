import React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { handleAlert } from "./alertSlice";

const Alert = () => {
    const { alertValue, alertType, alertMessage } = useSelector((state) => state.alert);

    const dispatch = useDispatch();

    return (
        <>
            <Snackbar
                open={alertValue}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={() => dispatch(handleAlert({ showAlert: false }))}
            >
                <MuiAlert
                    onClose={() => dispatch(handleAlert({ showAlert: false }))}
                    severity={alertType}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default Alert;
