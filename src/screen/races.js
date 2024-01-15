import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../component/CustomInput";
import { useEffect, useState, useRef } from "react";
import getListUser from "../logic/get/getListUser";
import updateScore from "../logic/update/updateScore";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "@env";
export function Races() {
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const flatListRef = useRef(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [scorePlayer1, setScorePlayer1] = useState([]);
  const [scorePlayer2, setScorePlayer2] = useState([]);
  const [scorePlayer3, setScorePlayer3] = useState([]);
  const [player, setPlayer] = useState(0);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    getAllUser(SERVER_URL);
  }, []);

  const getAllUser = async (url) => {
    try {
      const newData = await getListUser(url);
      setUserList([...newData]);
    } catch (err) {}
  };
  const handleScoreChange = (playerIndex, value) => {
    const numericValue = parseFloat(value);
    // Update the score for the corresponding player

    switch (playerIndex) {
      case 1:
        setScorePlayer1((prevScores) => [...prevScores, numericValue]);
        break;
      case 2:
        setScorePlayer2((prevScores) => [...prevScores, numericValue]);
        break;
      case 3:
        setScorePlayer3((prevScores) => [...prevScores, numericValue]);
        break;
      default:
        break;
    }
    setPlayer(player + 1);

    if (player == 2) {
      setButtonDisabled(false);
      setPlayer(0)
    }
  };
  const handleConfirm = async () => {
    await updateScore(
      currentRound + 1,
      scorePlayer1[currentRound],
      scorePlayer2[currentRound],
      scorePlayer3[currentRound],
      SERVER_URL
    );
    if (currentRound < userList.length - 1) {
      setCurrentRound(currentRound + 1);
      setButtonDisabled(true);
      setPlayer(0)
    }
    if (currentRound == userList.length - 1) {
      navigation.navigate("ListAfterRaces");
    }
  };
  const renderItem = ({ item, index }) => {
    if (index <= currentRound) {
      return (
        <View style={styles.boxRound}>
          <Text style={styles.round}>{`Round ${index + 1}`}</Text>
          <View style={styles.line} />
          <View style={styles.containerColumn}>
            <View style={styles.column}>
              <Text>{item.player1}</Text>
              <CustomInput
                keyboardType="numeric"
                onChangeText={(txt) => handleScoreChange(1, String(txt))}
                value={scorePlayer1[currentRound]}
              />
            </View>
            <View style={styles.column}>
              <Text>{item.player2}</Text>
              <CustomInput
                keyboardType="numeric"
                onChangeText={(txt) => handleScoreChange(2, String(txt))}
                value={scorePlayer2[currentRound]}
              />
            </View>
            <View style={styles.column}>
              <Text>{item.player3}</Text>
              <CustomInput
                keyboardType="numeric"
                onChangeText={(txt) => handleScoreChange(3, String(txt))}
                value={scorePlayer3[currentRound]}
              />
            </View>
          </View>
        </View>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "90%" }}>
        <FlatList
          ref={flatListRef}
          data={userList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isButtonDisabled ? "gray" : "blue" },
        ]}
        onPress={handleConfirm}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  boxRound: {
    height: 150,
    width: "95%",
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
    alignContent: "center",
  },
  round: {
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
  line: {
    borderBottomColor: "black", // Màu sắc của đường thẳng
    borderBottomWidth: 0.5, // Độ dày của đường thẳng
    width: "100%",
  },
  containerColumn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    alignItems: "center",
    flex: 1, // Mỗi cột chiếm 1 phần đều ra trong flexbox
    padding: 10, // Khoảng cách bên trong của mỗi cột
    borderWidth: 1,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
