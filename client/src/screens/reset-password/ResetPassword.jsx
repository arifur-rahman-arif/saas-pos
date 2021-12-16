import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

import Alert from "../../features/alert/Alert";
import { useDispatch } from "react-redux";
import { handleAlert } from "../../features/alert/alertSlice";
import { Navigate, useParams } from "react-router";

const ResetPassword = () => {
    // Resert token
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [passwordInputError, setPasswordInputError] = useState(false);
    const [confirmPasswordInputError, setConfirmPasswordInputError] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || password.length < 1) {
            setPasswordInputError(true);
            return;
        } else {
            setPasswordInputError(false);
        }

        if (password.length < 6) {
            dispatch(
                handleAlert({
                    showAlert: true,
                    alertType: "info",
                    alertMessage: "Your new password should be at least 6 characters",
                })
            );
            return;
        }

        let patten =
            /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

        if (!patten.test(password)) {
            dispatch(
                handleAlert({
                    showAlert: true,
                    alertType: "info",
                    alertMessage: "Your new password is week",
                })
            );
            return;
        }

        if (!newPassword || newPassword.length < 1) {
            setConfirmPasswordInputError(true);
            return;
        } else {
            setConfirmPasswordInputError(false);
        }

        if (password !== newPassword) {
            dispatch(
                handleAlert({
                    showAlert: true,
                    alertType: "warning",
                    alertMessage: "Password and confirm password needs to be same",
                })
            );
            return;
        }

        // const reqBody = {
        //     password: userPassword,
        //     keepMeLoggedIn,
        // };

        // if (userLogin.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
        //     reqBody.email = userLogin;
        // } else {
        //     reqBody.userName = userLogin;
        // }

        // loginFunction(reqBody);
    };

    return (
        <>
            {!token && <Navigate to="/" />}
            <div className="reset_password_container">
                <form
                    onSubmit={handleSubmit}
                    component="form"
                    className="inner_card"
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        style={{ zIndex: "0" }}
                        id="password"
                        className="full_width_input"
                        label="New password"
                        variant="outlined"
                        helperText={passwordInputError ? "Password is required" : ""}
                        error={passwordInputError}
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordInputError(false);
                        }}
                    />

                    <TextField
                        style={{ zIndex: "0" }}
                        id="confirm-password"
                        className="full_width_input"
                        label="Confirm password"
                        variant="outlined"
                        helperText={confirmPasswordInputError ? "Password needs to be same" : ""}
                        error={confirmPasswordInputError}
                        type="password"
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setConfirmPasswordInputError(false);
                        }}
                    />

                    <LoadingButton
                        type="submit"
                        loading={false}
                        disabled={false}
                        variant="outlined"
                    >
                        Reset Password
                    </LoadingButton>
                </form>
            </div>

            <Alert />
        </>
    );
};

export default ResetPassword;
