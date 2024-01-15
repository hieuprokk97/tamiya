import axios from "axios";

const updateScore = async (
  roundNumber,
  scorePlayer1,
  scorePlayer2,
  scorePlayer3,
  serverURL
) => {
  try {
    const result = await axios.post(`${serverURL}/round/update-score`, {
      roundNumber,
      scorePlayer1,
      scorePlayer2,
      scorePlayer3,
    });
  } catch (err) {
    console.log("err: ", err);
  }
};

export default updateScore;
