
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import ChoresNavigator from './ChoresNavigator.js';
import GroceriesNavigator from './GroceriesNavigator.js';
import ExpenseNavigator from './ExpenseNavigator.js';
import colors from '../assets/colors.js';

import axios from 'axios';

const Tabs = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>This is the homepage</Text>
      <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
    </View>
  )
}

export default function DashboardScreen(props) {
  // hooks
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firebaseAuthID, setfirebaseAuthID] = useState('');
  const [householdID, sethouseholdID] = useState('');
  const [isHouseholdOwner, setIsHouseholdOwner] = useState('');
  const [pictureURL, setpictureURL] = useState('');

  const [householdName, setHouseholdName] = useState('');
  const [groceries, setGroceries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [chores, setChores] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = () => {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          axios.get(`http://localhost:3009/signin/${user.uid}`)
            .then(result => {
              setFirstName(result.data.firstName);
              setLastName(result.data.lastName);
              sethouseholdID(result.data.householdID);
              setIsHouseholdOwner(result.data.isHouseholdOwner);
              setpictureURL(result.data.pictureURL);
              setfirebaseAuthID(user.uid);

              axios.get(`http://localhost:3009/api/household/${result.data.householdID}`)
                .then(results => {
                  setHouseholdName(results.data.name);
                  setGroceries(results.data.groceries);
                  setExpenses(results.data.expenses);
                  setChores(results.data.chores);
                  setUsers(results.data.users);
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
      })
    }
    fetchData();
  }, []);

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
          children={() => <ChoresNavigator
            firstName={firstName}
            householdID={householdID}
            chores={chores}
            users={users}
          />
          }
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
