"use client"

import { updateUser } from "@/app/lib/actions";
import { fetchSingleUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleUserPage =  async ({ params }) => {
  const { id } = params;
  const user = await fetchSingleUser(id);
  console.log(user);


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    userData.id = id;

    try {
      await updateUser(userData);
      toast.success("User updated successfully!", {
        onClose: () => {
          window.location.href = "/dashboard/users"; 
        }
      });
    } catch (error) {
      toast.error("Failed to update user!");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        <div className={styles.userInfo}>
          <span>{user.data.name}</span>
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.data.name} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.data.email} />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.data.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.data.address} />
          <label>Is Admin?</label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
