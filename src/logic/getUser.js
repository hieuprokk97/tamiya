import { useEffect, useState } from "react";

const getUser = async (serverURL) => {
  try{
    const response = await fetch(`${serverURL}/user/all_users`);
    const data = await response.json();
    console.log("🚀 ~ response:", response)
    return data.data
  }catch(error){
    console.log("Error: ", error)
  }
};

export default getUser;
