import axios from "axios";

const createRound = async (round, serverURL) => {
  try {
    const result = await axios.post(`${serverURL}/round/create`, {
      round,
    });

    return { status: result.data.status, message: result.data.message };
  } catch (error) {
    console.log("Lỗi yêu cầu:", error.message);
  }
};

export default createRound;
