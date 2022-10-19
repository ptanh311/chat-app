import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../../firebase";
import useDebounce from "../../hooks/useDebounce";
import styles from "./Search.module.scss";
import User from "../User/User";
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { StateContext } from "../../contexts/StateContext/StateContext";

const cx = classNames.bind(styles);

function Search() {
    const [input, setInput] = useState("");
    const [userResult, setUserResult] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const { data:searchState, dispatch:searchDispatch } = useContext(StateContext);

    const debounced = useDebounce(input, 500);

    useEffect(() => {
        // Custom string to querry " starts with "
        // const searchTerm = debounced.toLowerCase();
        const searchTerm = debounced;
        const strlength = searchTerm.length;
        const strFrontCode = searchTerm.slice(0, strlength - 1);
        const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length);
        const endCode =
            strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        // 

        const q = query(
            collection(db, "users"),
            where("displayName", ">=", searchTerm),
            where("displayName", "<", endCode)
        );
        
        getDocs(q)
            .then(querySnapshot => {
                const result = [];
                querySnapshot.forEach(doc => {
                    result.push(doc.data());
                });

                setUserResult(result);
            })
            .catch(err => {
                // 
            })
    }, [debounced])

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSelect = async (user) => {
        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid
        
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if(!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                await updateDoc(doc(db, "userChats", currentUser.uid) ,{
                    [combinedId + ".userInfo"] : {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"] : serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid) ,{
                    [combinedId + ".userInfo"] : {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"] : serverTimestamp()
                });

            }
        } catch(error) {
            // 
        }
    }

    const handleClick = async (user) => {
        dispatch({
            type: "CHANGE_USER",
            payload: user
        });

        await handleSelect(user);

        setInput("");
        setUserResult([]);
    };

    return (
        <div className={cx("search-result-wrap")}>
            <div className={cx("wrapper")}>
                <input
                    type="text"
                    placeholder="Find a user ..."
                    className={cx("search")}
                    onChange={handleChange}
                    value={input}
                    onFocus={() =>
                        searchDispatch({ type: "TOGGLE_SEARCHING_STATE" })
                    }
                    onBlur={() => {
                        searchDispatch({ type: "TOGGLE_SEARCHING_STATE" })
                        setInput("");
                    }}
                />
            </div>
            <div>
                {userResult &&
                    userResult.map((user, index) => (
                        <User
                            key={index}
                            data={user}
                            search
                            onClick={() => handleClick(user)}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Search;