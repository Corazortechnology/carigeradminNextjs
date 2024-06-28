import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      {/* Available Now */}
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="Available Now" fill />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h3 className={styles.title}>
            How to Manage User and Labor Details on Cariger Admin Dashboard?
          </h3>
          <span className={styles.subtitle}>Learn in 4 minutes</span>
          <p className={styles.desc}>
            Discover how to efficiently manage user and labor details on the Cariger admin dashboard.
          </p>
          {/* <button className={styles.button}>
            <MdPlayCircleFilled /> Watch
          </button> */}
        </div>
      </div>

      {/* Coming Soon */}
      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}>🚀 Coming Soon</span>
          <h3 className={styles.title}>
           See live 
          </h3>
          <span className={styles.subtitle}>Boost Admin Productivity</span>
          <p className={styles.desc}>
            Explore upcoming features for Cariger admin, including new server actions and partial pre-rendering capabilities.
          </p>
          {/* <button className={styles.button}>
            <MdReadMore /> Learn
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
