import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./DropDownExtend.module.scss";
import IconItem from "../IconItem/IconItem";

const cx = classNames.bind(styles);

function DropDownExtend({ data }) {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        active ? setActive(false) : setActive(true);
    }

    return (
        <div className={cx("wrapper")}>
            <div 
                className={cx("label")} 
                onClick={handleClick}
            >
                <span>{data.label}</span>
                { !active && <FontAwesomeIcon icon={faAngleDown} />}
                { active && <FontAwesomeIcon icon={faAngleUp} />}
            </div>
            {   active &&
                <ul className={cx("list")}>
                {data.list.map((item, index) => {
                    return <li key={index} className={cx("item")}>
                        <IconItem {...item} />
                    </li>;
                })}
            </ul>}
        </div>
    );
}

export default DropDownExtend;