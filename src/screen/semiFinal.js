import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomInput from "../component/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../component/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import getListUser from "../logic/get/getListUser";
import updateScore from "../logic/update/updateScore";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import updateFinal from "../logic/update/updateFinal";
import getUserSemiFinal from "../logic/get/getUserSemiFinal";
import createFinal from "../logic/create/createFinalList";
import { SERVER_URL } from "@env";
export function SemiFinal() {
  useEffect(() => {
    getAllUser(SERVER_URL);
  }, []);
  const round = useSelector((state) => state.counter.round);
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const flatListRef = useRef(null);
  const [isPressed1, setIsPressed1] = useState([]);
  const [isPressed2, setIsPressed2] = useState([]);
  const [isPressed3, setIsPressed3] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [currentRound, setCurrentRound] = useState(0);
  const [listFinal, setListFinal] = useState([]);
  const getAllUser = async (url) => {
    try {
      const newData = await getUserSemiFinal(url);
      setUserList([...newData]);
    } catch (err) {}
  };

  const handleConfirm = () => {
    createFinal(listFinal, SERVER_URL);
    navigation.navigate("Final");
  };
  const handleLongPress = (index, playerName) => {
    Alert.alert(
      "Xác nhận",
      `${playerName} vào chung kết đúng không?`,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            switch (index) {
              case 1:
                setIsPressed1((prevIsPressed1) => {
                  const updatedIsPressed1 = [...prevIsPressed1];
                  updatedIsPressed1[currentRound] = false; // hoặc giá trị mong muốn
                  return updatedIsPressed1;
                });
                break;
              case 2:
                setIsPressed2((prevIsPressed1) => {
                  const updatedIsPressed1 = [...prevIsPressed1];
                  updatedIsPressed1[currentRound] = false; // hoặc giá trị mong muốn
                  return updatedIsPressed1;
                });
                break;
              case 3:
                setIsPressed3((prevIsPressed1) => {
                  const updatedIsPressed1 = [...prevIsPressed1];
                  updatedIsPressed1[currentRound] = false; // hoặc giá trị mong muốn
                  return updatedIsPressed1;
                });
                break;
            }
          },
        },
        {
          text: "OK",
          onPress: () => {
            if (currentRound < userList.length - 1) {
              setCurrentRound(currentRound + 1);
            }
            if (currentRound == userList.length - 1) {
              setButtonDisabled(false);
            }
            setListFinal((prevIsPressed1) => {
              const updateListFinal = [...prevIsPressed1];
              updateListFinal[currentRound] = playerName; // hoặc giá trị mong muốn
              return updateListFinal;
            });
            updateFinal(SERVER_URL, playerName);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item, index }) => {
    if (index <= currentRound) {
      return (
        <View style={styles.boxRound}>
          <Text style={styles.round}>{`Round ${index + 1}`}</Text>
          <View style={styles.line} />
          <View style={styles.containerColumn}>
            <TouchableOpacity
              style={[
                styles.column,
                {
                  backgroundColor:
                    isPressed1[index] == true ? "yellow" : "white",
                },
              ]}
              onPress={() => {
                handleLongPress(1, item.player1);
                setIsPressed1((prevIsPressed) => {
                  const updatedIsPressed = [...prevIsPressed];
                  updatedIsPressed[index] = true;
                  return updatedIsPressed;
                });
              }}
            >
              <View>
                <Text style={[styles.round]}>{item.player1}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.column,
                {
                  backgroundColor:
                    isPressed2[index] == true ? "yellow" : "white",
                },
              ]}
              onPress={() => {
                handleLongPress(2, item.player2);
                setIsPressed2((prevIsPressed) => {
                  const updatedIsPressed = [...prevIsPressed];
                  updatedIsPressed[index] = true;
                  return updatedIsPressed;
                });
              }}
            >
              <View>
                <Text style={styles.round}>{item.player2}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.column,
                {
                  backgroundColor: isPressed3[index] ? "yellow" : "white",
                },
              ]}
              onPress={() => {
                handleLongPress(3, item.player3);
                setIsPressed3((prevIsPressed) => {
                  const updatedIsPressed = [...prevIsPressed];
                  updatedIsPressed[index] = true;
                  return updatedIsPressed;
                });
              }}
            >
              <View>
                <Text style={styles.round}>{item.player3}</Text>
              </View>
            </TouchableOpacity>
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
      <View style={{ height: "10%", width: "100%", alignItems: "center" }}>
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
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1, // Mỗi cột chiếm 1 phần đều ra trong flexbox
    padding: 10, // Khoảng cách bên trong của mỗi cột
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
