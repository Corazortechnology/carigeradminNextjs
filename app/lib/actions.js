"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export const addUser = async (userId) => {
    console.log(userId)
  try {
    const response = await axios.put(
      `https://cariger-user-provider.onrender.com/api/v1/users/blacklistuser/${userId}`
    );
    console.log("User blacklisted successfully:", response.data);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to blacklist user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};


export const updateUser = async (user) => {
  try {
    const response = await axios.put(`https://cariger-user-provider.onrender.com/api/v1/auth/userUpdate/${user.id}`, user);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update user!", error);
    throw new Error("Failed to update user!");
  }
};




export const addLabor = async (formData) => {


  console.log(" Labour add called")
  try {
    const response = await axios.post(
      `https://cariger-user-provider.onrender.com/api/v1/auth/laborRegister`,
      formData
    );
    console.log("Labor added successfully:", response.data);
    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add labor!");
  }

  revalidatePath("/dashboard/labours");
  redirect("/dashboard/labours");
};



export const updateLabor = async (id, laborData) => {

  console.log(laborData)
  try {
    const response = await axios.put(`https://cariger-user-provider.onrender.com/api/v1/auth/updateLabor/${id}`, laborData);
    return response.data;
  } catch (error) {
    console.error("Failed to update labor:", error);
    throw error; // Propagate the error to handle it in the component
  }
};