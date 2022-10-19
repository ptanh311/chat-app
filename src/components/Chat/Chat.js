import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPhoneFlip, faVideo } from '@fortawesome/free-solid-svg-icons'

import styles from "./Chat.module.scss";
import ChatMonitor from "../ChatMonitor/ChatMonitor";
import ChatInput from "../ChatInput/ChatInput";
import Image from "../Image/Image";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import { useContext } from "react";
import { LayoutContext } from "../../contexts/LayoutContext/LayoutContext";
import FocusContextProvider from "../../contexts/FocusContext/FocusContext";

const cx = classNames.bind(styles);

function Chat() {
    const { data } = useContext(ChatContext);
    const { data:state, dispatch } = useContext(LayoutContext);

    return (
        <FocusContextProvider>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("chat-with-user-info")}>
                        {data.user.displayName && (
                            <div className={cx("avatar-wrap")}>
                                <Image
                                    avatar
                                    width="38px"
                                    height="38px"
                                    src={data.user.photoURL}
                                />
                                <span>{data.user.displayName}</span>
                            </div>
                        )}
                    </div>
                    <div className={cx("chat-actions")}>
                        <div className={cx("icon-action")}>
                            <FontAwesomeIcon icon={faPhoneFlip} />
                        </div>
                        <div className={cx("icon-action")}>
                            <FontAwesomeIcon icon={faVideo} />
                        </div>
                        <div
                            className={cx("icon-action")}
                            onClick={() =>
                                dispatch({ 
                                    type: "TOGGLE_USERINFO_SIDEBAR",
                                    payload: state
                                })
                            }
                        >
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </div>
                    </div>
                </div>
                <ChatMonitor />
                <ChatInput />
            </div>
        </FocusContextProvider>
    );
}

export default Chat;
