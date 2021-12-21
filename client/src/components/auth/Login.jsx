import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { GoogleLogin } from "react-google-login";
// import { useGoogleLogin } from "react- google-login";
import FacebookLogin from "react-facebook-login";

import { useLoginMutation } from "../../services/auth";
import { useDispatch } from "react-redux";
import { handleAlert } from "../../features/alert/alertSlice";
import { validateEmail } from "../../global";

const Login = () => {
    // Login form state
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(true);

    const [showLoginError, setShowLoginError] = useState(false);
    const [showLoginPasswordError, setShowLoginPasswordError] = useState(false);

    const dispatch = useDispatch();

    // All ajax req here
    const [loginCaller, { isError, isLoading, isSuccess, error }] = useLoginMutation();

    // const { signIn, loaded } = useGoogleLogin({

    // });

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
    }, [isError, error, dispatch]);

    const loginSubmit = (e) => {
        e.preventDefault();

        if (!userLogin || userLogin.length < 1) {
            setShowLoginError(true);
            return;
        } else {
            setShowLoginError(false);
        }

        if (!userPassword || userPassword.length < 1) {
            setShowLoginPasswordError(true);
            return;
        } else {
            setShowLoginPasswordError(false);
        }

        const reqBody = {
            password: userPassword,
            keepMeLoggedIn,
        };

        if (userLogin.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
            if (!validateEmail(userLogin)) {
                dispatch(
                    handleAlert({
                        showAlert: true,
                        alertType: "warning",
                        alertMessage: "Please provide a valid email address",
                    })
                );
                return;
            }

            reqBody.email = userLogin;
        } else {
            reqBody.userName = userLogin;
        }

        loginCaller(reqBody);
    };

    // useEffect(() => {
    //     console.log(signIn, loaded);
    // }, [signIn, loaded]);

    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <>
            {isSuccess && <Navigate to="/dashboard" />}

            <div className="login">
                <label className="label" htmlFor="chk" aria-hidden="true">
                    Login
                </label>
                <form
                    onSubmit={loginSubmit}
                    component="form"
                    className="login_form"
                    noValidate
                    autoComplete="on"
                >
                    <TextField
                        style={{ zIndex: "0" }}
                        id="userlogin"
                        className="full_width_input"
                        label="Username/Email"
                        variant="outlined"
                        helperText={showLoginError ? "Username or email is required" : ""}
                        error={showLoginError}
                        onChange={(e) => {
                            setUserLogin(e.target.value);
                            setShowLoginError(false);
                        }}
                    />
                    <TextField
                        style={{ zIndex: "0" }}
                        id="password"
                        className="full_width_input"
                        type="password"
                        label="Password"
                        variant="outlined"
                        helperText={showLoginPasswordError ? "Password is required" : ""}
                        error={showLoginPasswordError}
                        onChange={(e) => {
                            setUserPassword(e.target.value);
                            setShowLoginPasswordError(false);
                        }}
                    />

                    <div className="full_width">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    label="Keep me logged in"
                                    checked={keepMeLoggedIn}
                                    sx={{ "& .MuiSvgIcon-root": { fontSize: 26 } }}
                                />
                            }
                            onChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
                            label="Keep me logged in"
                        />

                        <Link
                            href="#"
                            underline="hover"
                            component={RouterLink}
                            to="/forgot-password"
                        >
                            Forgot password
                        </Link>
                    </div>

                    <LoadingButton
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading}
                        variant="outlined"
                        className="login_btn"
                    >
                        Login
                    </LoadingButton>

                    <div className="social_login">
                        <GoogleLogin
                            className="google_login"
                            clientId="573219645067-ko4u5hbl362i8l0cu6ghmbbbgt5df9gf.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />

                        <FacebookLogin
                            cssClass="facebook_login"
                            appId="1088597931155576"
                            autoLoad={true}
                            icon="fab fa-facebook-square"
                            textButton="Facebook"
                            fields="name,email,picture"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
