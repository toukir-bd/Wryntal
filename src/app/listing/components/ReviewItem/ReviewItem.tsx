import { Avatar } from "antd";
import styles from "./ReviewItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

interface ReviewItemProps {
  userName: string;
  userImage: string;
  rating: string;
  review: string;
  date: Date;
}

const ReviewItem = ({
  userName,
  userImage,
  rating,
  review,
  date,
}: ReviewItemProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.user}>
        <Avatar icon={<FontAwesomeIcon icon={faUser} />} src={userImage} />
        <span>{userName}</span>
        <span className={styles.rating}>
          <FontAwesomeIcon icon={faStar} />({rating})
        </span>
      </div>
      <p className={styles.text}>
        {review.length > 150 ? review.substring(0, 150) + "..." : review}
      </p>
      <span className={styles.date}>{dayjs(date).format("MMMM DD, YYYY")}</span>
    </div>
  );
};

export default ReviewItem;
