"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../slices/orderSlice";
import { fetchUsers } from "../slices/usersSlice";
import { fetchLabours } from "../slices/labourSlice";
import Card from "../ui/dashboard/card/Card";
import Chart from "../ui/dashboard/chart/Chart";
import styles from "../ui/dashboard/dashboard.module.css";
import PrivateRoute from "../PrivateRoute";
const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  // const users = useSelector((state) => state.users.users);
  const labors = useSelector((state) => state.labors.labors);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUsers());
    dispatch(fetchLabours());
  }, [dispatch]);

  const cards = [
    // {
    //   id: 1,
    //   title: "Total Users",
    //   number: users.length,
    //   change: users.length > 0 ? 10 : 0,  //bug!
    // },
    {
      id: 2,
      title: "Total Orders",
      number: orders.length,
      change: orders.length > 0 ? 10 : 0,
    },
    {
      id: 3,
      title: "Total Labors",
      number: labors.length,
      change: labors.length > 0 ? 10 : 0,
    },
  ];

  console.log({ orders,labors });

  return (
    <PrivateRoute>

    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Chart />
      </div>
    </div>
        </PrivateRoute>
  );
};

export default Dashboard;
