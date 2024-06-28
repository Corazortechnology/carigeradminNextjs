"use client"

import axios from 'axios';
import { setusers } from '../slices/usersSlice'; 
import { setOrders } from '../slices/orderSlice';
import { setLabors } from '../slices/labourSlice';
import { useSelector } from 'react-redux';




export const fetchUsers = async () => {
  
  try {
      const response = await axios.get(`https://cariger-user-provider.onrender.com/api/v1/auth/users`);
    //   console.log(response.data)

      return response.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return { count: 0, users: [] };
    }
  };

export const fetchSingleUser = async (id) => {
    try {
      const response = await axios.get(`https://cariger-user-provider.onrender.com/api/v1/auth/user/${id}`);
    //   console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return { count: 0, users: [] };
    }
  };


  

export const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:4040/api/v1/auth/users/${id}`);
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};


export const fetchLabours = async () => {
  try {
    const response = await axios.get(`https://cariger-user-provider.onrender.com/api/v1/auth/labors`, {
    
    });
  //   console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { count: 0, users: [] };
  }
};



export const fetchSingleLabour = async (id) => {
  console.log("fetchsiinglelabour")
  try {
    const response = await axios.get(`https://cariger-user-provider.onrender.com/api/v1/auth/labor/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return { data: {} }; 
  }
};

 

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`https://cariger-user-provider.onrender.com/api/v1/auth/getallorders`, {
    
    });
  //   console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { count: 0, users: [] };
  }
};


