"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { fetchUsers } from "@/app/lib/data";

const UsersPage = ({ searchParams }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  

  const handleBlacklist = async (userId) => {
    // const response = await axios.post(`${URL}api/v1/auth/adminLogin`, formData);
    try {
      const response = await axios.put(
        `${URL}/api/v1/auth/users/blacklistuser/${userId}`
      );
      if (response.status === 200) {
        // Refetch users after updating blacklist status
        const usersData = await fetchUsers();
        setUsers(usersData.data);
      }
    } catch (err) {
      console.log(err);
      throw new Error("Failed to blacklist user!");
    }
  };

  // Filter users 
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toString().includes(searchTerm)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." onSearch={setSearchTerm} />
       
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
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
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={user.img || "/noavatar.png"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {user.name}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>+91 {user.phone}</td>
                <td>{user.orders ? user.orders.length : "no orders"}</td>
                <td
                  className={
                    user.blacklisted
                      ? styles.blacklisted
                      : styles.removeblacklist
                  }
                >
                  {user.blacklisted ? "Blacklisted" : "Not Blacklisted"}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      id={
                        user.blacklisted
                          ? styles.blacklistedbutton
                          : styles.removeblacklistbutton
                      }
                      onClick={() => handleBlacklist(user._id)}
                      className={`${styles.button} ${styles.delete}`}
                    >
                      {user.blacklisted ? "Remove Blacklist" : "Blacklist"}
                    </button>
                    <Link href={`/dashboard/users/${user._id}`}>
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
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination count={filteredUsers.length} />
    </div>
  );
};

export default UsersPage;
