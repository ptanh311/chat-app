import classNames from "classnames/bind";

import Message from "../Message/Message";
import styles from "./ChatMonitor.module.scss";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { FocusContext } from "../../contexts/FocusContext/FocusContext";

const cx = classNames.bind(styles);

function ChatMonitor() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const { setFocus, focus } = useContext(FocusContext);

    useEffect(() => {
        setFocus(focus + 1);
        const unSub = onSnapshot(doc(db, "chats", data.chatID), doc => {
            doc.exists() && setMessages(doc.data().messages);
        })

        return () => {
            unSub();
        }
    }, [data.chatID]);

    return (
        <div className={cx("wrapper")}>
            {data.user.displayName &&
                messages.map((mess, index) => {
                    return <Message key={index} data={mess} />;
                })}
        </div>
    );
}

export default ChatMonitor;