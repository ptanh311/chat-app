import classNames from "classnames/bind";
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faImage } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from "react";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

import styles from "./ChatInput.module.scss";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import { db } from "../../firebase";
import { FocusContext } from "../../contexts/FocusContext/FocusContext";

const cx = classNames.bind(styles);

function ChatInput() {
    const [input, setInput] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const { focus } = useContext(FocusContext);
    
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    },[focus])

    const handleSubmit = async () => {
        const temp = input;
        setInput("");
        await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion({
                id: uuid(),
                text: temp,
                senderID: currentUser.uid,
                date: Timestamp.now()
            })
        })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatID + ".lastMessage"] : { text: temp },
            [data.chatID + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatID + ".lastMessage"]: { text: temp },
            [data.chatID + ".date"]: serverTimestamp()
        });
    }

    return (
        <div className={cx("wrapper")}>
            <input type="file" id={cx("file")} />
            <label forhtml={cx("file")} className={cx("file-label")} >
                <FontAwesomeIcon icon={faImage} />
            </label>
            <input type="file" id={cx("image")} />
            <label forhtml={cx("image")} className={cx("file-label")} >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </label>
            
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Enter a message..." 
                className={cx("input")} 
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                value={input}
                onChange={e => setInput(e.target.value)}
            />

            <button 
                className={cx("send-btn")}
                onClick={handleSubmit}
            >Send</button>
        </div>
    );
}

export default ChatInput;