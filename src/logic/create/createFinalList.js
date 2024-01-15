import axios from "axios";

const createFinal = async (users, serverURL) => {
  try {
    const result = await axios.post(`${serverURL}/round/final`, {
      users,
    });

    return { status: result.data.status, message: result.data.message };
  } catch (error) {
    console.log("Lỗi yêu cầu:", error.message);
  }
};

export default createFinal;
