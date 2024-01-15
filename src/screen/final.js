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
  Modal,
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
import getListFinal from "../logic/get/getListFinal";
import { Picker } from "@react-native-picker/picker";
import DropDownComponent from "../component/DropDown/DropDown";
import { SERVER_URL } from "@env";
export function Final() {
  useEffect(() => {
    getAllUser(SERVER_URL);
  }, []);
  const [userList, setUserList] = useState([]);
  const flatListRef = useRef(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const getAllUser = async (url) => {
    try {
      const newData = await getListFinal(url);
      setUserList([...newData]);
    } catch (err) {}
  };

  const handleLongPress = (playerName) => {
    const updatedSelectedPlayers = [...selectedPlayers];
    // Lấy danh sách người chơi đã được chọn và sắp xếp chúng theo thứ tự chọn
    updatedSelectedPlayers[updatedSelectedPlayers.length] = playerName;
    setSelectedPlayers(updatedSelectedPlayers);
    if (currentRound < userList.length - 1) {
      setCurrentRound(currentRound + 1);
    }
  };

  const renderItem = ({ item, index }) => {
    if (index <= currentRound) {
      return (
        <View style={styles.boxRound}>
          <Text style={styles.round}>{`Round Final`}</Text>
          <View style={styles.line} />
          <View style={styles.containerColumn}>
            <TouchableOpacity
              style={[styles.column]}
              onPress={() => {
                handleLongPress(item.player1);
              }}
            >
              <View>
                <Text style={[styles.round]}>{item.player1}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.column]}
              onPress={() => {
                handleLongPress(item.player2);
              }}
            >
              <View>
                <Text style={styles.round}>{item.player2}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.column]}
              onPress={() => {
                handleLongPress(item.player3);
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
      <View style={{ width: "100%", height: "50%" }}>
        <FlatList
          ref={flatListRef}
          data={userList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
        />
      </View>
      <View style={{ borderWidth: 1, padding: 50 }}>
        <Text style={{ fontSize: 30 }}>Top 1: {selectedPlayers[0]}</Text>
        <Text style={{ fontSize: 30 }}>Top 2: {selectedPlayers[1]}</Text>
        <Text style={{ fontSize: 30 }}>Top 3: {selectedPlayers[2]}</Text>
        <Text style={{ fontSize: 30 }}>Top 4: {selectedPlayers[3]}</Text>
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
