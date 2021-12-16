import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

import Alert from "../../features/alert/Alert";
import { useDispatch } from "react-redux";
import { handleAlert } from "../../features/alert/alertSlice";
import { validateEmail } from "../../global";

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState("");
    const [emailInputError, setEmailInputError] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userEmail || userEmail.length < 1) {
            setEmailInputError(true);
            return;
        } else {
            setEmailInputError(false);
        }

        if (!validateEmail(userEmail)) {
            dispatch(
                handleAlert({
                    showAlert: true,
                    alertType: "warning",
                    alertMessage: "Please provide a valid email address",
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
            <div className="forgot_password_container">
                <form
                    onSubmit={handleSubmit}
                    component="form"
                    className="inner_card"
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        style={{ zIndex: "0" }}
                        id="userlogin"
                        className="full_width_input"
                        label="Enter your email"
                        variant="outlined"
                        helperText={emailInputError ? "Email is required" : ""}
                        error={emailInputError}
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                            setEmailInputError(false);
                        }}
                    />

                    <LoadingButton
                        type="submit"
                        loading={false}
                        disabled={false}
                        variant="outlined"
                    >
                        Send Reset Token
                    </LoadingButton>
                </form>
            </div>

            <Alert />
        </>
    );
};

export default ForgotPassword;
