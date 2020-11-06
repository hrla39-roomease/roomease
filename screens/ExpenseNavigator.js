import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseScreen  from './AddExpenseScreen.js';
import colors from '../assets/colors.js';

const Stack = createStackNavigator();

const DATA = [
  {
    id: "1",
    name: "Nick",
  },
  {
    id: "2",
    name: "Alvin",
  },
  {
    id: "3",
    name: "Alphina",
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.name}>{item.name}</Text>
  </TouchableOpacity>
);

function HomeExpenseScreen({navigation}) {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? colors.primaryBlue : colors.mediumGrey;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <View style={styles.container}>
    <Text>Hello Expense Screen</Text>

  <Button
    color="black"
    title="Add an expense"
    onPress={() => navigation.navigate('Add Expense Screen')}
  />
  <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />

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
    marginTop: StatusBar.currentHeight || 0,
  },
  name: {
    fontSize: 32,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});