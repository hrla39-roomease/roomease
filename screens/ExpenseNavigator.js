import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseScreen  from './AddExpenseScreen.js';
import colors from '../assets/colors.js';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

const FixedExpenses = [
  {
    id: "1",
    expenseItem: "Rent",
    user: "Alphina",
    cost: "$3,200.00"
  },
  {
    id: "2",
    expenseItem: "Water",
    user: "Alvin",
    cost: "$64.35"
  },
  {
    id: "3",
    expenseItem: "Internet",
    user: "Nick",
    cost: "$75.99"
  }
];

const OtherExpenses = [
  {
    id: "1",
    expenseItem: "Costco Run",
    user: "Alphina",
    cost: "$105.60"
  },
  {
    id: "2",
    expenseItem: "Pizza Night",
    user: "Alvin",
    cost: "$42.89"
  },
  {
    id: "3",
    expenseItem: "Concert Tickets",
    user: "Nick",
    cost: "$455.03"
  }
];

function Item({expenseItem, user, cost}) {
  return (
    <View style={{flex: 1, flexDirection: "row", marginTop: 10, marginBottom: 10}}>
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text style={styles.listExpenseItem}>{expenseItem}</Text>
        <Text style={styles.listUser}>{user}</Text>
      </View>
      <Text style={styles.listCost}>{cost}</Text>
    </View>
  );
}


// function Other({expenseItem, user, cost}) {
//   return (
//     <View style={{flex: 1, flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10}}>
//       <View style={{ flex: 1, justifyContent: 'center'}}>
//         <Text style={styles.listExpenseItem}>{expenseItem}</Text>
//         <Text style={styles.listUser}>{user}</Text>
//       </View>
//       <Text style={styles.listCost}>{cost}</Text>
//     </View>
//   );
// }

function HomeExpenseScreen({navigation}) {
  return (

    <View style={styles.container, {marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10}}>

      <SafeAreaView
        style={styles.header}
        leftComponent={{ icon: 'plus'}} />

      <Button
        style={styles.addButton}
        color="black"
        title="+"
        onPress={() => navigation.navigate('Add Expense Screen')}
      />

      <Text style={{fontSize: 20, color: "gray"}}>Fixed Monthly Expenses</Text>
      <FlatList data={FixedExpenses} renderItem={({item}) => (
        <Item expenseItem={item.expenseItem} user={item.user} cost={item.cost}/>
      )}/>

      <Text style={{fontSize: 20, marginTop: 30, color: "gray"}}>Other Household Expenses</Text>
      <FlatList data={OtherExpenses} renderItem={({item}) => (
        <Item expenseItem={item.expenseItem} user={item.user} cost={item.cost}/>
      )}/>

      <Text style={{fontSize: 20, marginTop: 30, color: "gray"}}>Your Share</Text>


    </View>
  )
}

export default function ExpenseNavigator () {

  return (

    <Stack.Navigator>
      <Stack.Screen
      name="Expenses"
      component={HomeExpenseScreen}
      options={{
        headerStyle: {
          backgroundColor: colors.primaryDark,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 30
        },
      }}
      />
      <Stack.Screen name="Add Expense Screen" component={AddExpenseScreen}/>
    </Stack.Navigator>

  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  addButton: {
    fontSize: 200
  },
  listItem: {
    flexDirection: "row",
  },
 listExpenseItem: {
    fontSize: 16,
    alignItems: "flex-start"
  },
  listUser: {
    fontSize: 12,
    alignItems: "flex-start",
    color: colors.secondary
  },
  listCost: {
    fontSize: 17,
    alignItems: "flex-end"
  },
  header: {
    color: colors.primaryDark
  }
});