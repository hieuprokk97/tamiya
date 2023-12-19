import React, { Component, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import DropDownComponent from "../component/DropDown/DropDown";
import axios from "axios";
import { Table, Row, Rows } from "react-native-table-component";
import createUser from "../logic/createUser";
import getUser from "../logic/getUser";

export function Home() {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const serverURL = "http://172.16.4.227:3000";

  const resetButton = () => {
    setData([]);
  };
  useEffect(() => {
    getAllUser(serverURL);
  }, []);
  const getAllUser = async (url) => {
    try {
      const newData = await getUser(url);
      setData(newData);
    } catch (err) {
      console.log("🚀 ~ err:", err);
    }
  };
  const addRow = async () => {
    const result = createUser(inputValue, serverURL);
    await result.then((value) => {
      console.log("🚀 ~ value:", value)
      return setNewRow(value)
    })
    console.log("🚀 ~ newRow:", newRow);
    setData([...data, newRow]);
    setNewRow({});
    setInputValue("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.score}</Text>
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
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.totalText}>
          Tổng số lượng người tham gia: {data.length}
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
    width: "50%",
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
