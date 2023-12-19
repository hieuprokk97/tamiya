import { View, Text, TextInput } from 'react-native'
import React from 'react';
import styles from './styles'

const CustomInput = ({value, onChangText, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
        <TextInput  value={value}
                    onChangeText={onChangText}
                    placeholder={placeholder} 
                    secureTextEntry={secureTextEntry}
                    style={styles.input}/>
    </View>
  )
}

export default CustomInput