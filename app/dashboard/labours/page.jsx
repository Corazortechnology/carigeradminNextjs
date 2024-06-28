"use client"
import { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { fetchLabours } from "@/app/lib/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LaboursPage = () => {
  const [labours, setLabours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getLabours = async () => {
      setLoading(true);
      try {
        const laboursData = await fetchLabours();
        setLabours(laboursData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLabours();
  }, []);

  const handleBlacklist = async (laborId) => {
    try {
      const response = await axios.put(
        `http://localhost:4040/api/v1/auth/labors/blacklist/${laborId}`
      );
      if (response.status === 200) {
        toast.success("Labor blacklisted successfully!");
        // Refetch labours after updating blacklist status
        const laboursData = await fetchLabours();
        setLabours(laboursData.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to blacklist labor!");
    }
  };

  // Filter labors based on search term
  const filteredLabours = labours.filter((labor) => {
    return (
      labor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      labor.phone.toString().includes(searchTerm)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a labor..." onSearch={setSearchTerm} />
        <Link href="/dashboard/labours/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Designation</td>
            <td>Phone</td>
            <td>Orders</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : filteredLabours.length > 0 ? (
            filteredLabours.map((labor) => (
              <tr key={labor._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={labor.img || "/noavatar.png"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {labor.name}
                  </div>
                </td>
                <td>{labor.designation}</td>
                <td>{labor.phone}</td>
                <td>{labor.orders ? labor.orders.length : "no orders"}</td>
                <td
                  className={
                    labor.blacklisted
                      ? styles.blacklisted
                      : styles.removeblacklist
                  }
                >
                  {labor.blacklisted ? "Blacklisted" : "Not Blacklisted"}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      id={
                        labor.blacklisted
                          ? styles.blacklistedbutton
                          : styles.removeblacklistbutton
                      }
                      onClick={() => handleBlacklist(labor._id)}
                      className={`${styles.button} ${styles.delete}`}
                    >
                      {labor.blacklisted ? "Remove Blacklist" : "Blacklist"}
                    </button>
                    <Link href={`/dashboard/labours/${labor._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No labors found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination count={filteredLabours.length} />
      <ToastContainer />
    </div>
  );
};

export default LaboursPage;
