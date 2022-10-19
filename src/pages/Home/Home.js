import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import { Navbar, Sidebar, Chat, UserChatInfo } from "../../components";

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("wrapper")}>
            <Navbar />
            <Sidebar />
            <Chat />
            <UserChatInfo />
        </div>
    );
}

export default Home;