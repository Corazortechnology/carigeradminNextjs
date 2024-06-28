"use client"


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlics"
import orderReducer from "../slices/orderSlice";
import laborReducer from "../slices/labourSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        orders: orderReducer,
        labors: laborReducer,

    }
})


export default store

