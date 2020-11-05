import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import LoadingScreen from './screens/LoadingScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import DashboardScreen from './screens/DashboardScreen.js';
import ExpenseNavigator from './screens/ExpenseNavigator.js';
import Homepage from './screens/Homepage.js';
import HouseholdConnect from './screens/HouseholdConnect.js';
import firebase from 'firebase';
import { firebaseConfig } from './config';

// firebase.initializeApp(firebaseConfig);



export default class App extends React.Component {
  render() {
    return (
    <AppNavigator />
    )
  }
}

const AppSwitchNavigator = createSwitchNavigator(
  {
    LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    HouseholdConnect: HouseholdConnect,
    Homepage: Homepage,
    DashboardScreen: DashboardScreen
  }
);

const AppNavigator = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
