import classNames from "classnames/bind";

import styles from "./UsersSearch.module.scss";
import User from "../User/User";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { StateContext } from "../../contexts/StateContext/StateContext";

const cx = classNames.bind(styles);

function UsersSearch() {
    const [chatUsers, setChatUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const { data:displayState } = useContext(StateContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(
                doc(db, "userChats", currentUser.uid),
                (doc) => {
                    setChatUsers(
                        Object.entries(doc.data())?.sort((a, b) => {
                            return b[1].date - a[1].date;
                        })
                    );
                }
            );

            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({
            type: "CHANGE_USER",
            payload: user
        });
    }

    return (
        <div 
            className={cx("wrapper")}
        >
            {   !displayState.isSearching &&
                chatUsers?.map((user, index) => {
                    return (
                        <User
                            data={user[1].userInfo}
                            lastMess={user[1].lastMessage || ""}
                            key={index}
                            onClick={() => handleSelect(user[1].userInfo)}
                        />
                    );
                })
            }
        </div>
    );
}

export default UsersSearch;