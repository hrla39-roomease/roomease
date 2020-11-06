import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseScreen  from './AddExpenseScreen.js';

const Stack = createStackNavigator();

function HomeExpenseScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Text>Hello Expense Screen</Text>

  <Button
    color="black"
    title="Add an expense"
    onPress={() => navigation.navigate('Add Expense Screen')}
  />

  <FlatList
    data={[
      {key: 'Devin'},
      {key: 'Dan'},
      {key: 'Dominic'},
      {key: 'Jackson'},
      {key: 'James'},
      {key: 'Joel'},
      {key: 'John'},
      {key: 'Jillian'},
      {key: 'Jimmy'},
      {key: 'Julie'},
    ]}
    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
  />

  <Text>Nick, Water Bill, $50</Text>
  <Text>Alvin, Electricity Bill, $109</Text>
  <Text>Alphina, Bread, $4</Text>
  </View>
  )
}

export default function ExpenseNavigator () {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Expenses" component={HomeExpenseScreen} />
      <Stack.Screen name="Add Expense Screen" component={AddExpenseScreen}/>
    </Stack.Navigator>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});