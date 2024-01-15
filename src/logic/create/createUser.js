import axios from "axios";
import { Alert } from "react-native";

const createUser = async (name, serverURL) => {
  try {
    const result = await axios.post(`${serverURL}/user/create`, { name });
    if (result.data.status !== 200) {
      return { message: result.data.message };
    }
    return {
      id: result.data.data.id,
      name: result.data.data.name,
      score: result.data.data.score,
    };
  } catch (error) {
    console.log("Lỗi yêu cầu:", error.message);
  }
};

export default createUser;
