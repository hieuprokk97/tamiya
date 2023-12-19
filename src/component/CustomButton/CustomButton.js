import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor, bdradius}) => {
    return (
      <Pressable  
        onPress={onPress} 
          style={[
            styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {},
            bdradius ? {borderRadius: bdradius} : {}
          ]}>
          <Text 
            style={[
              styles.text, 
              styles[`text_${type}`],
              fgColor ? {color: fgColor} : {}
             ]}>{text}</Text>
      </Pressable>
  )
}

export default CustomButton