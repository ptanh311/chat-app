import classNames from "classnames/bind";
import { useContext, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import styles from "./Message.module.scss";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import Image from "../Image/Image";

const cx = classNames.bind(styles);

function Message({ data }) {
    const { currentUser } = useContext(AuthContext);
    const { data:userData } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current.scrollIntoView({
            behavior: "smooth"
        });
    }, [data])

    const getTime = () => {
        const date = new Date(data.date.seconds*1000);
        const res = date.toString().split(" ").slice(0,5).join(" ");
        return res;
    }

    return (
        <div
            className={cx("wrapper", {
                owner: currentUser.uid === data.senderID,
                sender: currentUser.uid !== data.senderID,
            })}
            ref={ref}
        >
            <div className={cx("avatar")}>
                <Image
                    avatar
                    width="32px"
                    height="32px"
                    src={
                        currentUser.uid === data.senderID
                            ? currentUser.photoURL
                            : userData.user.photoURL
                    }
                />
            </div>
            <Tippy
                content={getTime()}
                placement={currentUser.uid === data.senderID ? "left" : "right"}
                className={cx("tippy")}
            >
                <div className={cx("message-content")}>
                    <div className={cx("mess-text")}>
                        <p>{data.text}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default Message;