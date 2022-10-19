import classNames from "classnames/bind";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import Logo from "../../imgs/svgs/logo";
import styles from "./Login.module.scss";
import { auth } from "../../firebase";

const cx = classNames.bind(styles);

function Login() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (error) {
            setErr(true);
        }

    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("logo-wrap")}>
                    <Logo width="24px" color="#fff" />
                    <h2 className={cx("title")}>Chat App</h2>
                </div>
                <span>Login</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter email..." />
                <input type="password" placeholder="Enter password..." />
                <button>Submit</button>
                {err && <span>Something went wrong!</span>}
            </form>
            <div className={cx("footer")}>
                <span>Do not have an account?</span>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;