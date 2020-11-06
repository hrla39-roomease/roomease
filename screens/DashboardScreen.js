import React, { Component }from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import ChoresNavigator from './ChoresNavigator.js';
import GroceriesNavigator from './GroceriesNavigator.js';
import ExpenseNavigator from './ExpenseNavigator.js';
import colors from '../assets/colors.js';

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
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.neutralMedium,
          }}
        >
          <Tabs.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Expenses"
            component={ExpenseNavigator}
            options={{
              tabBarLabel: 'Expenses',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="dollar-sign" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Chores"
            component={ChoresNavigator}
            options={{
              tabBarLabel: 'Chores',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="check-square" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Groceries"
            component={GroceriesNavigator}
            options={{
              tabBarLabel: 'Groceries',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="shopping-cart" size={size} color={color} />
              ),
            }}
          />
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
