
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Modal,
} from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import Homepage from './Homepage.js'
import ChoresNavigator from './ChoresNavigator.js';
import GroceriesNavigator from './GroceriesNavigator.js';
import ExpenseNavigator from './ExpenseNavigator.js';
import colors from '../assets/colors.js';

const Tabs = createBottomTabNavigator();

export default function DashboardScreen(props) {
  // hooks
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firebaseAuthID, setfirebaseAuthID] = useState('');
  const [householdID, sethouseholdID] = useState('');
  const [isHouseholdOwner, setIsHouseholdOwner] = useState('');
  const [pictureURL, setpictureURL] = useState('https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg');

  const [householdName, setHouseholdName] = useState('');
  const [groceries, setGroceries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [chores, setChores] = useState([]);
  const [users, setUsers] = useState([]);


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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.neutralMedium,
          labelPosition: 'belowIcon',
        }}
      >
        <Tabs.Screen
          name="Homepage"
          children={() => <Homepage
            pictureURL={pictureURL}
            firstName={firstName}
            lastName={lastName}
            householdName={householdName}
            householdID={householdID}
            groceries={groceries}
          />
          }
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Expenses"
          children={() => <ExpenseNavigator
            firstName={firstName}
            householdID={householdID}
            expenses={expenses}
            users={users}
            fetchData={fetchData}
          />
          }
          options={{
            tabBarLabel: 'Expenses',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="dollar-sign" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Chores"
          children={() => <ChoresNavigator
            firstName={firstName}
            householdID={householdID}
            chores={chores}
            users={users}
            fetchData={fetchData}
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
          children={() => <GroceriesNavigator
            groceries={groceries}
            householdID={householdID}
            fetchData={fetchData}
          />
          }
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
  },
});
