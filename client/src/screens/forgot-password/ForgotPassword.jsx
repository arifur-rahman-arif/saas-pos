import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import ReCAPTCHA from "react-google-recaptcha";

import Alert from "../../features/alert/Alert";
import { useDispatch } from "react-redux";
import { handleAlert } from "../../features/alert/alertSlice";
import { validateEmail } from "../../global";
import { useForgotPasswordMutation } from "../../services/auth";

const ForgotPassword = () => {
    const [forgotPasswordCaller, { isError, isLoading, isSuccess, error, data }] =
        useForgotPasswordMutation();

    const dispatch = useDispatch();

    const [userEmail, setUserEmail] = useState("");
    const [emailInputError, setEmailInputError] = useState(false);
    const [captchaOk, setCaptchaOk] = useState(false);

    useEffect(() => {
        if (isError) {
            dispatch(
                handleAlert({
                    showAlert: true,
                    alertType: "error",
                    alertMessage: error.data.message,
                })
            );
        }
        if (isSuccess) {
            setUserEmail("");

            dispatch(
                handleAlert({
                    showAlert: true,
                    alertType: "success",
                    alertMessage: data.message,
                })
            );
        }
    }, [isError, isSuccess, isLoading, error, data, dispatch]);

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

        const reqBody = {
            email: userEmail,
        };

        if (!captchaOk) {
            dispatch(
                handleAlert({
                    showAlert: true,
                    alertType: "warning",
                    alertMessage: "Please validate the captcha field",
                })
            );
            return;
        }

        forgotPasswordCaller(reqBody);
    };

    const captchaOnChange = (val) => {
        if (val && val != null) {
            setCaptchaOk(true);
        }
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

                    <ReCAPTCHA
                        className="captcha_field"
                        sitekey="6LdM68wdAAAAADwXStmlRy5puuZNu1Twe0ozsxe4"
                        onChange={captchaOnChange}
                    />

                    <LoadingButton
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading}
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
