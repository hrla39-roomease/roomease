
import React, { Component }from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import ExpenseNavigator from './ExpenseNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChoresNavigator from './ChoresNavigator.js';
import GroceriesNavigator from './GroceriesNavigator.js';



const Tabs = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>This is the homepage</Text>
      <Button title="Sign Out" onPress={() => firebase.auth().signOut()}/>
    </View>
  )
}


export default function DashboardScreen (props){

  const { navigation } = props;
  const firstName = navigation.getParam('firstName', '');
  const lastName = navigation.getParam('lastName', '');
  const firebaseAuthID = navigation.getParam('firebaseAuthID', '');
  const householdID = navigation.getParam('householdID', '');
  const isHouseholdOwner = navigation.getParam('isHouseholdOwner', '');
  const pictureURL = navigation.getParam('pictureURL', '');

    return (
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="Home" component={HomeScreen} />
          <Tabs.Screen name="Expenses" component={ExpenseNavigator} />
          <Tabs.Screen name="Chores" component={ChoresNavigator} />
          <Tabs.Screen name="Groceries" component={GroceriesNavigator} />
        </Tabs.Navigator>
      </NavigationContainer>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  }
});
