import React, { Component }from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';



export default class LoadingScreen extends React.Component {

  componentDidMount(){
    this.checkedIfLoggedIn();
  }

  checkedIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios.get(`http://localhost:3009/signin/${user.uid}`)
          .then((result) => {
            if (result.data.householdID === '') {
              this.props.navigation.navigate('HouseholdConnect');
            } else {
              this.props.navigation.navigate('Homepage', {
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                firebaseAuthID: result.data.firebaseAuthID,
                householdID: result.data.householdID,
                isHouseholdOwner: result.data.isHouseholdOwner,
                pictureURL: result.data.pictureURL,
              });
            }
          })
          .catch((err) => console.error(err));
        this.props.navigation.navigate('DashboardScreen')
      } else {
        this.props.navigation.navigate('LoginScreen')
      }
    })
  }

  render() {
    return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading Screen</Text>
    </SafeAreaView>
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
