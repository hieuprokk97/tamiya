import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import getUserAfterRound from "../logic/get/getUserAfterRound";
import { useEffect, useState } from "react";
import CheckBox from "expo-checkbox";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../component/CustomButton";
import updateStatus from "../logic/update/updateStatus";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "@env";
export function ListAfterRaces() { 
  const navigation = useNavigation();
  const semiFinal = useSelector((state) => state.counter.semiFinal);
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    getAllUser(SERVER_URL);
  }, []);
  const getAllUser = async (url) => {
    try {
      const newData = await getUserAfterRound(url);
      setData([...newData]);
    } catch (err) {}
  };

  const handleCheckBoxChange = (userId) => {
    setData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, isChecked: user.isChecked === 1 ? 0 : 1 }
          : user
      )
    );
  };
  const handleUpdateStatus = async () => {
    const checkedUsers = data.filter((user) => user.isChecked === 1);
    const payload = {
        users: checkedUsers.map((user) => ({
          id: user.id,
          name: user.name,
          score: user.score,
          isChecked: user.isChecked,
        })),
      };
    await updateStatus(SERVER_URL, payload);
    navigation.navigate('SemiFinal')
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}> {index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.score}</Text>
      <View style={styles.cell}>
        <CheckBox
          style={styles.checkbox}
          value={item.isChecked ? true : false}
          onValueChange={() => handleCheckBoxChange(item.id)}
        />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Score</Text>
          <Text style={styles.headerCell}>Check</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonConfirm}>
        <CustomButton text={"Xác nhận"} onPress={handleUpdateStatus} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  table: {
    padding: 16,
    height: '90%',
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
  buttonConfirm: {
    width: "100%",
    paddingStart: 5,
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  checkbox: {
    alignSelf: "center",
  },
});
