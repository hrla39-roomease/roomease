
import React, { Component }from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import ExpenseNavigator from './ExpenseNavigator.js'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello from dashboard!</Text>
      <Button title="Sign Out" onPress={() => firebase.auth().signOut()}/>
    </View>
  );
}



export default class DashboardScreen extends React.Component {
  render() {
    return (

      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="Home" component={HomeScreen} />
          <Tabs.Screen name="Expenses" component={ExpenseNavigator} />
        </Tabs.Navigator>
      </NavigationContainer>

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
