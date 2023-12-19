import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';

const data = [
  { label: '3', value: '3' },
  { label: '5', value: '5' },
];

const DropDownComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default DropDownComponent;
