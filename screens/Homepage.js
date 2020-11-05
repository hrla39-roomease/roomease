import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Homepage(props) {

  const { navigation } = props;
  const firstName = navigation.getParam('firstName', '');
  const lastName = navigation.getParam('lastName', '');
  const firebaseAuthID = navigation.getParam('firebaseAuthID', '');
  const householdID = navigation.getParam('householdID', '');
  const isHouseholdOwner = navigation.getParam('isHouseholdOwner', '');
  const pictureURL = navigation.getParam('pictureURL', '');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the homepage</Text>
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
