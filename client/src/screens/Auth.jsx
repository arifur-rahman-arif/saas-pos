import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Alert from "../features/alert/Alert";

const Auth = () => {
    return (
        <>
            <div className="auth_container">
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <Register />
                    <Login />
                </div>
            </div>

            <Alert />
        </>
    );
};

export default Auth;
