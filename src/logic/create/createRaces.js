import axios from "axios";
import { Alert } from "react-native";

const createRaces = async (round, semiFinal, serverURL) => {
  try {
    const result = await axios.post(`${serverURL}/races/create`, {
      round,
      semiFinal,
    });
    return { status: result.data.status, message: result.data.message };
  } catch (error) {
    console.log("Lỗi yêu cầu:", error.message);
  }
};

export default createRaces;
