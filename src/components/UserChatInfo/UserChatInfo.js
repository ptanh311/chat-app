import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faFile, faFlag, faGear, faImage, faMagnifyingGlass, faPen, faSearch, faUser, faUserXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './UserChatInfo.module.scss';
import Image from "../Image/Image";
import DropDownExtend from '../DropDownExtend/DropDownExtend';
import { ChatContext } from "../../contexts/ChatContext/ChatContext";
import { useContext, useState } from 'react';
import { LayoutContext } from '../../contexts/LayoutContext/LayoutContext';

const cx = classNames.bind(styles);

const extendData = [
    {
        label: "Chat setting",
        list: [
            { icon: <FontAwesomeIcon icon={faGear} />, text: "Change theme" },
            { icon: <FontAwesomeIcon icon={faPen} />, text: "Change alias" },
            {
                icon: <FontAwesomeIcon icon={faSearch} />,
                text: "Search message",
            },
        ],
    },
    {
        label: "File, media and link",
        list: [
            { icon: <FontAwesomeIcon icon={faFile} />, text: "File" },
            { icon: <FontAwesomeIcon icon={faImage} />, text: "Media" },
            { icon: <FontAwesomeIcon icon={faSearch} />, text: "Link" },
        ],
    },
    {
        label: "Support",
        list: [
            { icon: <FontAwesomeIcon icon={faBell} />, text: "Disable notification" },
            { icon: <FontAwesomeIcon icon={faUserXmark} />, text: "Block" },
            { icon: <FontAwesomeIcon icon={faFlag} />, text: "Report" },
        ],
    },
];

function UserChatInfo() {
    const { data } = useContext(ChatContext);
    const { data:state } = useContext(LayoutContext);

    return (
        <>
            {   state.infoSidebar &&
                <div className={cx("wrapper")}>
                    {/* {   data.user.displayName && */}
                        <div className={cx("user-avatar")}>
                            <div className={cx("avatar")}>
                                <Image avatar width="60px" height="60px" src={data.user.photoURL} />
                            </div>
                            <span className={cx("user-name")}>{data.user.displayName}</span>
                        </div>
                    {/* } */}
                    <div className={cx("user-info")}>
                        <div className={cx("icon-text")}>
                            <div className={cx("icon")}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <span>Profile</span>
                        </div>
                        <div className={cx("icon-text")}>
                            <div className={cx("icon")}>
                                <FontAwesomeIcon icon={faBell} />
                            </div>
                            <span>Notification</span>
                        </div>
                        <div className={cx("icon-text")}>
                            <div className={cx("icon")}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <span>Search</span>
                        </div>
                    </div>
                    <div className={cx("chat-extend")}>
                        {extendData.map((item, index) => (
                            <DropDownExtend data={item} key={index} />
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default UserChatInfo;