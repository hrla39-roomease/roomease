import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeChoresScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Text>Hello Chores</Text>
    </View>
  )
}

export default function ChoresNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chores" component={HomeChoresScreen} />
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