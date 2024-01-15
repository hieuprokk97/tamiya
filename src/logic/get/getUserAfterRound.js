const getUserAfterRound = async (serverURL) => {
  try {
    const response = await fetch(`${serverURL}/round/rate-score`);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.log("🚀 ~ err:", err);
  }
};
export default getUserAfterRound;
