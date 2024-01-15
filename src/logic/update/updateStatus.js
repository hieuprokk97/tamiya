import axios from "axios";

const updateStatus = async (serverURL, checkedUsers) => {
  try {
    // Gửi yêu cầu đến API endpoint để cập nhật trạng thái người dùng
    await axios.post(`${serverURL}/user/update-status`, checkedUsers);
  } catch (error) {
    console.error("Error updating user status:", error);
  }
};

export default updateStatus;
