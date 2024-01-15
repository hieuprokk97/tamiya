import React, { useEffect, useState, version, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import createUser from "../logic/create/createUser";
import getUser from "../logic/get/getUser";
import removeUserAll from "../logic/delete/deleteAllUser";
import deleteUser from "../logic/delete/deleteUser";
import createRaces from "../logic/create/createRaces";
import { useSelector, useDispatch } from "react-redux";
import { updateRound, updateSemiFinal } from "../redux/slice/counterSlice";
import createRound from "../logic/create/createRound";
import { SERVER_URL } from "@env";
const serverURL = SERVER_URL;
export function Home() {
  const dispatch = useDispatch();
  const flatListRef = React.useRef(null);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [semiFinalValue, setSemiFinalValue] = useState("");
  const [roundValue, setRoundValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isButtonResetDisable, setButtonResetDisable] = useState(false);
  useEffect(() => {
    getAllUser(serverURL);
  }, []);
  const getAllUser = async (url) => {
    try {
      const newData = await getUser(url);
      if (!newData.length) {
        setButtonResetDisable(true);
        setButtonDisabled(true);
      } else {
        setData([...newData]);
      }
    } catch (err) {}
  };
  const addRow = async () => {
    if (!inputValue) {
      Alert.alert("Lỗi", "Vui lòng nhập tên");
      return;
    }
    const result = createUser(inputValue, serverURL);

    await result.then((value) => {
      if (value.message) {
        Alert.alert("Thông báo", value.message);
        setInputValue("");
        return;
      } else {
        setData((preValue) => [...preValue, value]);
        setInputValue("");
        setButtonDisabled(false);
        setButtonResetDisable(false);
        return;
      }
    });
  };
  const resetButton = () => {
    if (data.length > 0) {
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn xóa?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              // Xử lý logic khi nhấn nút OK
              removeUserAll(serverURL);
              setData([]);
              setButtonDisabled(true);
              setButtonResetDisable(true);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Xóa thất bại",
        "Không có dữ liệu để xóa", // Đây là tiêu đề của Alert
        [{ text: "OK", onPress: () => console.log("Button OK pressed") }]
      );
    }
  };
  const removeUser = async (index) => {
    try {
      await deleteUser(serverURL, index);
      const newItems = [...data];
      newItems.splice(index, 1);
      newItems.forEach((item, i) => {
        item.id = i + 1; // Assuming IDs are 1-based
      });
      setData(newItems);
      if (data.length == 1) {
        setButtonDisabled(true);
        setButtonResetDisable(true);
      }
    } catch (err) {
      console.log("🚀 ~ err:", err);
    }
  };
  const handleConfirm = async () => {
    dispatch(updateRound(roundValue));
    dispatch(updateSemiFinal(semiFinalValue));
    setRoundValue("");
    setSemiFinalValue("");
    const response = createRaces(roundValue, semiFinalValue, serverURL);
    await response.then(async (value) => {
      if (value.status == 400) {
        Alert.alert("Lỗi!!!", value.message);
      } else {
        await createRound(roundValue, serverURL);
        navigation.navigate("Races");
        setButtonDisabled(true);
      }
    });
  };

  const renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.tableRow}
        onPress={() => removeUser(index)}
      >
        <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.score}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>TAMIYA</Text>
      </View>
      <View style={styles.viewInput}>
        <View style={{ width: "70%", paddingHorizontal: 5, paddingStart: 15 }}>
          <CustomInput
            placeholder={"Điền tên người chơi..."}
            onChangeText={setInputValue}
            value={inputValue}
          />
        </View>
        <View style={{ width: "40%" }}>
          <CustomButton text={"NHẬP"} onPress={addRow} />
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Score</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.totalText}>
          Tổng số lượng người tham gia: {data?.length}
        </Text>
      </View>
      <View style={styles.comboBoxView}>
        <View style={styles.viewComboText}>
          <Text style={styles.comboText}>Số Round</Text>
        </View>
        <View style={styles.roundTextStyle}>
          <CustomInput
            placeholder={"Điền số round..."}
            onChangeText={setRoundValue}
            value={roundValue}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.comboBoxView}>
        <View style={styles.viewComboText}>
          <Text style={styles.comboText}>Số người vào Semifinal</Text>
        </View>
        <View style={styles.roundTextStyle}>
          <CustomInput
            placeholder={"Điền số lượng..."}
            onChangeText={setSemiFinalValue}
            value={semiFinalValue}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.resetButton}>
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
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isButtonResetDisable ? "gray" : "blue" },
          ]}
          onPress={resetButton}
          disabled={isButtonResetDisable}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTitle: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    textDecorationLine: "underline",
    color: "red",
    letterSpacing: 3,
  },
  scrollView: {
    marginBottom: 10,
  },
  viewInput: {
    marginVertical: 10,
    width: "90%",
    flexDirection: "row",
  },
  table: {
    padding: 16,
    height: 400,
  },
  headerText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontStyle: "italic",
    fontSize: 16,
  },
  totalView: {
    marginStart: 20,
  },
  totalText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  resetButton: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "53%",
  },
  option: {
    fontSize: 16,
  },
  viewComboText: {
    paddingTop: 20,
    paddingStart: 20,
  },
  comboText: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  tableHeader: {
    paddingStart: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
  },
  headerCell: {
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  picker: {
    borderColor: "gray", // Màu viền
    borderWidth: 1, // Độ rộng viền
    borderRadius: 5, // Độ cong của góc (tùy chọn)
    overflow: "hidden",
    marginHorizontal: 15,
  },
  roundTextStyle: {
    paddingStart: 15,
  },
  buttonConfirm: {
    width: "100%",
    paddingStart: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "90%",
    marginStart: 10,
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
