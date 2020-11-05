import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HouseholdConnect() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the household chooser</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  }
})
