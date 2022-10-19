import classNames from "classnames/bind";
import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

function Image({ src, alt, avatar, round, width="56px", height="56px" }) {
    return (
        <img
            width={width}
            height={height}
            src={
                src ||
                "https://www.anphatpc.com.vn/media/news/0812_wp3850825-4k-pc-wallpapers.jpg"
            }
            alt={alt}
            className={cx("image", {
                avatar,
                round,
            })}
        />
    );
}

export default Image;