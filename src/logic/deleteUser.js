import axios from "axios";

const deleteUser = async (serverURL, id) => {
  try {
    await axios.post(`${serverURL}/user/delete/${id+1}`);
  } catch (err) {
    console.log("🚀 ~ err:", err);
  }
};

export default deleteUser
