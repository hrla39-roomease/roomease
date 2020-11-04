
import React, { Component }from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';



export default class LoadingScreen extends React.Component {

  componentDidMount(){
    this.checkedIfLoggedIn();
  }

  checkedIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('DashboardScreen')
      } else {
        this.props.navigation.navigate('LoginScreen')
      }
    })
  }

  render() {
    return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>LoadingScreen</Text>
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
