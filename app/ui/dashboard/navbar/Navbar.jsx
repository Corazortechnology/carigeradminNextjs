"use client";

import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";


const Navbar = () => {
  const pathname = usePathname();
  const path = pathname.split("/").pop();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {path}
      </div>
 
    </div>
  );
};

export default Navbar;
