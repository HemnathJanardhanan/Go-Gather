import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const events = () => {
    const {id} = useLocalSearchParams();
  return (
    <View>
      <Text> events {id}</Text>
    </View>
  )
}

export default events