import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const LoginComponent = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="auth_container">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <label className="label" for="chk" aria-hidden="true">
                        Sign up
                    </label>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            style={{ "z-index": "0" }}
                            type="text"
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                        />
                        <TextField
                            style={{ "z-index": "0" }}
                            type="text"
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                        />
                        <TextField
                            style={{ "z-index": "0" }}
                            type="Email"
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            style={{ "z-index": "0" }}
                            id="outlined-basic"
                            type="password"
                            label="Password"
                            variant="outlined"
                        />
                        <TextField
                            style={{ "z-index": "0" }}
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                        />
                        <button>Sign up</button>
                    </Box>
                </div>

                <div className="login">
                    <label className="label" for="chk" aria-hidden="true">
                        Login
                    </label>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            style={{ "z-index": "0" }}
                            id="outlined-basic"
                            label="Username/Email"
                            variant="outlined"
                        />
                        <TextField
                            style={{ "z-index": "0" }}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                        />
                        <button>Login</button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
