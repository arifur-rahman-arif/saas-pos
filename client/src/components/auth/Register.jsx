import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Register = () => {
    // Signup form state
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    const signUpSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
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
                    <button className="sign_up_btn">Sign up</button>
                </Box>
            </div>
        </>
    );
};

export default Register;
