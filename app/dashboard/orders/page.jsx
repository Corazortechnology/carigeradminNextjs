"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { fetchOrders } from "@/app/slices/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersPage = ({ searchParams }) => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders
  const filteredOrders = orders.flatMap(order =>
    order.orders.filter(o =>
      o.orderId.includes(searchTerm) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.labour && o.labour.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ).map(o => ({ ...o, userName: order.user.name }))
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for an order..." onSearch={setSearchTerm} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Order Status</th>
            <th>Labor Name</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((o, index) => (
              <tr key={index}>
                <td>{o.orderId}</td>
                <td>{o.userName}</td>
                <td>{o.completed ? "Completed" : "Pending"}</td>
                <td>{o.labour ? o.labour.name : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination count={filteredOrders.length} />
      <ToastContainer />
      {error && toast.error("Failed to fetch orders!")}
    </div>
  );
};

export default OrdersPage;
