import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "./styles";

const CustomInput = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;
