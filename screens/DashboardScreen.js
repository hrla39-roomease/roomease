
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native';
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


function HomeScreen(props) {
  // onPress={() => firebase.auth().signOut()}

  return (
    <View style={styles.container}>
      <SafeAreaView style={headerStyles.header}>
        <View style={headerStyles.left}>
          <Text style={headerStyles.headerText}></Text>
        </View>
        <View style={headerStyles.center}>
          <Text style={headerStyles.headerTitle}>Home</Text>
        </View>
        <View style={headerStyles.right}>
          <TouchableOpacity
            underlayColor={colors.primaryLighter}
            style={{ marginRight: 8 }}
            onPress={() => {
              // setAddItemModalVisible(!addItemModalVisible)
            }}
          >
            <Image
              source={{ uri: props.pictureURL }}
              style={headerStyles.profilePhoto}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
          name="Home"
          children={() => <HomeScreen
            pictureURL={pictureURL}
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

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryDark,
    width: '100%',
    height: '11.25%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  center: {
    paddingBottom: 10,
    flex: 2,
    alignItems: 'center',
  },
  right: {
    paddingBottom: 10,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  profilePhoto: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  left: {
    paddingBottom: 10,
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal',
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
