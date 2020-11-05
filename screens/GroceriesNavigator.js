import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeGroceriesScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Text>Hello Groceries</Text>
    </View>
  )
}

export default function GroceriesNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Groceries" component={HomeGroceriesScreen} />
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});