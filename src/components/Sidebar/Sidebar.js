import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";

import styles from "./Sidebar.module.scss";
import Search from "../Search/Search";
import UsersSearch from "../UsersSearch/UsersSearch";
import { auth } from "../../firebase";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";

const cx = classNames.bind(styles);

function Sidebar() {
    const { dispatch } = useContext(ChatContext);

    const handleLogOut = async () => {
        try {
            dispatch({ type: "RESET_CONTEXT" });
            await signOut(auth);
        } catch (error) {
            // 
        }
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx('header')}>
                <span className={cx('label')}>
                    Chat
                </span>
            </div>
            <Search />
            <div className={cx('users')}>
                <UsersSearch />
            </div>
        </div>
    );
}

export default Sidebar;
