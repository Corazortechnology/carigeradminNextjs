"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import {  fetchSingleLabour } from "@/app/lib/data";
import { updateLabor } from "@/app/lib/actions";

const SingleLaborPage = ({ params }) => {
  const { id } = params;
  const [labor, setLabor] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const laborData = await fetchSingleLabour(id);
        setLabor(laborData.data);
        console.log(laborData)
      } catch (error) {
        console.error("Failed to fetch labor:", error);
      }
    };

    fetchData();
  }, [id]);
  console.log(labor)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const laborData = Object.fromEntries(formData.entries());

    try {
      await updateLabor(id, laborData);
      toast.success("Labor updated successfully!", {
        onClose: () => {
          router.push("/dashboard/labours");
        }
      });
    } catch (error) {
      toast.error("Failed to update labor!");
      console.error("Failed to update labor:", error);
    }
  };

  if (!labor) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={labor.img || "/noavatar.png"} alt="" fill />
        </div>
        <div className={styles.userInfo}>
          <span>{labor.name}</span>
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
         
          <label>Name</label>
          <input type="text" name="name" placeholder={labor.name} />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={labor.phone} />
          <label>Designation</label>
          <input type="text" name="designation" placeholder={labor.designation} />
          <label>Address</label>
          <textarea name="address" placeholder={labor.address}></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleLaborPage;
