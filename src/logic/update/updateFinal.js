import axios from "axios";

const updateFinal = async (serverURL, checkedUsers) => {
  try {
    // Gửi yêu cầu đến API endpoint để cập nhật trạng thái người dùng
    await axios.post(`${serverURL}/user/final`, { player: checkedUsers });
  } catch (error) {
    console.error("Error updating user status:", error);
  }
};

export default updateFinal;
