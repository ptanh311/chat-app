import classNames from "classnames/bind";
import styles from "./IconItem.module.scss";
import {} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function IconItem({ icon, text }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("icon-wrap")}>
                {icon}
            </div>
            <span>{text}</span>
        </div>
    );
}

export default IconItem;