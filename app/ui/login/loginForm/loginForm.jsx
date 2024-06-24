"use client";

import styles from "./loginForm.module.css";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4040/api/v1/auth/adminLogin", formData);
      console.log(response.data);
    } catch (err) {
      setError("Error logging in");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
