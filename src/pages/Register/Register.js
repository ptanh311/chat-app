import { useState } from "react";
import classNames from "classnames/bind";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";


import styles from "./Register.module.scss";
import Logo from "../../imgs/svgs/logo";
import { auth, storage, db } from "../../firebase";

const cx = classNames.bind(styles);

function Register() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, "images/" + userName);
            await uploadBytesResumable(storageRef, file);
            getDownloadURL(storageRef)
                .then(async (downloadURL) => {
                    try {
                        await updateProfile(auth.currentUser, {
                            photoURL: downloadURL,
                            displayName: userName
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            displayName: userName,
                            uid: res.user.uid,
                            email,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                    } catch (error) {
                        // 
                    }


                })

            navigate("/");
        } catch (error) {
            setErr(true);
        }
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("logo-wrap")}>
                    <Logo width="24px" color="#fff" />
                    <h2 className={cx("title")}>
                        Chat App
                    </h2>
                </div>
                <span>Register</span>
            </div>
            <form onSubmit={handleSubmit}>

                <input type="text" placeholder="Enter user name..." />
                <input type="email" placeholder="Enter email..." />
                <input type="password" placeholder="Enter password..." />
                <input type="file" id={cx("file")}/>
                <label htmlFor={cx("file")}>
                    <FontAwesomeIcon icon={faFileArrowUp} />
                    <span>Upload avatar</span>
                </label>
                <button>Submit</button>
                {err && <span>Something went wrong!</span>}
            </form>
            <div className={cx("footer")}>
                <span>Have an account?</span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Register;