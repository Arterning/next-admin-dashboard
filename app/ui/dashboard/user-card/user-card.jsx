import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./user-card.module.css";

const UserCard = ({ item }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={30} />
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.description}>{item.description}</span>
        <span className={styles.detail}>
            {item.detail}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
