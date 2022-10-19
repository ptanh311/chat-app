import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBoxArchive, faComment, faCommentDots, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../../imgs/svgs"

import styles from "./Navbar.module.scss";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const cx = classNames.bind(styles);

function Navbar() {
    const { dispatch } = useContext(ChatContext);

    const handleLogOut = async () => {
        try {
            dispatch({ type: "RESET_CONTEXT" });
            await signOut(auth);
        } catch (error) {
            //
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div>
                <div className={cx("logo")}>
                    <Logo />
                </div>
                <div className={cx("nav-icon")}>
                    <FontAwesomeIcon icon={faComment} />
                </div>
                <div className={cx("nav-icon")}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
                <div className={cx("nav-icon")}>
                    <FontAwesomeIcon icon={faCommentDots} />
                </div>
                <div className={cx("nav-icon")}>
                    <FontAwesomeIcon icon={faBoxArchive} />
                </div>
            </div>
            <div className={cx("action")}>
                <div className={cx("icon-wrap")} onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;