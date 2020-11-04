
import React, { Component }from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';


export default class DashboardScreen extends React.Component {
  render() {
    return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>
      <Button title="Sign Out" onPress={() => firebase.auth().signOut()}/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
