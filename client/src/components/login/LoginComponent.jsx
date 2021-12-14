import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLoginMutation } from "../../services/auth";

const LoginComponent = () => {
    // Signup form state
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    // Login form state
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [showLoginError, setShowLoginError] = useState(false);
    const [showLoginPasswordError, setShowLoginPasswordError] = useState(false);
    // All ajax req here
    const [loginFunction, { isError, isLoading, isSuccess, error }] = useLoginMutation();

    const signUpSubmit = (e) => {
        e.preventDefault();
    };

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
        };

        if (userLogin.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
            reqBody.email = userLogin;
        } else {
            reqBody.userName = userLogin;
        }

        loginFunction(reqBody);
    };

    return (
        <div className="auth_container">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <label className="label" htmlFor="chk" aria-hidden="true">
                        Sign up
                    </label>
                    <Box
                        className="signup_form"
                        onSubmit={signUpSubmit}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <div className="full_width">
                            <TextField
                                style={{ zIndex: "0" }}
                                type="text"
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                            />
                            <TextField
                                style={{ zIndex: "0" }}
                                type="text"
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                            />
                        </div>

                        <TextField
                            style={{ zIndex: "0" }}
                            type="text"
                            className="full_width_input"
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                        />
                        <TextField
                            style={{ zIndex: "0" }}
                            type="email"
                            className="full_width_input"
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            style={{ zIndex: "0" }}
                            id="outlined-basic"
                            className="full_width_input"
                            type="password"
                            label="Password"
                            variant="outlined"
                        />
                        <TextField
                            style={{ zIndex: "0" }}
                            id="outlined-basic"
                            className="full_width_input"
                            label="Confirm Password"
                            variant="outlined"
                        />
                        <button>Sign up</button>
                    </Box>
                </div>

                <div className="login">
                    <label className="label" htmlFor="chk" aria-hidden="true">
                        Login
                    </label>
                    <Box
                        onSubmit={loginSubmit}
                        component="form"
                        className="login_form"
                        noValidate
                        autoComplete="off"
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
                        <button>Login</button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
