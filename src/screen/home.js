import React, { useEffect, useState, version } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import createUser from "../logic/createUser";
import getUser from "../logic/getUser";
import removeUserAll from "../logic/deleteAllUser";
import deleteUser from "../logic/deleteUser";

export function Home() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const serverURL = "http://172.16.1.1:3000";

  useEffect(() => {
    getAllUser(serverURL);
  }, []);
  const getAllUser = async (url) => {
    try {
      const newData = await getUser(url);
      setData([...newData]);
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
    } catch (err) {
      console.log("🚀 ~ err:", err);
    }
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
        <CustomInput
          placeholder={"Điền tên người chơi..."}
          onChangText={setInputValue}
          value={inputValue}
        />
        <CustomButton text={"NHẬP"} onPress={addRow} />
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Score</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.totalText}>
          Tổng số lượng người tham gia: {data?.length}
        </Text>
      </View>
      <View style={styles.comboBoxView}>
        <View style={styles.viewComboText}>
          <Text style={styles.comboText}>Số Vòng Đua</Text>
        </View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemChange) => setSelectedValue(itemChange)}
        >
          <Picker.Item label="3" value="3" style={styles.option} />
          <Picker.Item label="5" value="5" style={styles.option} />
        </Picker>
      </View>
      <View style={styles.resetButton}>
        <CustomButton text={"Confirm"} />
        <CustomButton text={"Reset"} onPress={resetButton} />
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
    marginStart: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: {
    padding: 16,
    height: "25%",
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
});
