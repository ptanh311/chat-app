import classNames from "classnames/bind";

import Image from "../Image/Image";
import styles from "./User.module.scss";

const cx = classNames.bind(styles);

function User({ data={}, search, widthAuto, onClick, lastMess }) {
    return (
        <div 
            className={cx("wrapper")}
            onClick={onClick}
        >
            <div className={cx("avatar")}>
                <Image
                    width={ search && "40px" }
                    height={ search && "40px" }
                    avatar
                    src={data.photoURL}
                />
            </div>
            <div className={cx("info")}>
                <span className={cx("user-name")}>{data.displayName}</span>
                {   
                    !search &&
                    <div className={cx("lastmess-wrap")}>
                        <span className={cx("last-message")}>{lastMess.text}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default User;