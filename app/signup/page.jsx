import styles from "./lsignup.module.css";
import SignupForm from "../ui/signup/signupform";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <SignupForm/>
    </div>
  );
};

export default LoginPage;
