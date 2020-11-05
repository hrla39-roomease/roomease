import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput} from 'react-native';


export default function AddExpense ({navigation}) {
  const [name, setName] = useState('Nick');
  const [item, setItem] = useState('Water Bill');
  const [price, setPrice] = useState('109');


  return (

    <View style={styles.container}>

      <Text>Item:</Text>
      <TextInput
        placeholder="Water bill"
        style={styles.input}
        onChangeText={(val) => setItem(val)}
      />

      <Text>Cost:</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="102.34"
        style={styles.input}
        onChangeText={(val) => setPrice(val)}
      />

      <Button
        color="black"
        title="Add to expenses!"
        onPress={() => {
          Alert.alert(
            "Hooray!", "Expenses are split at the end of the month",
          )
          navigation.goBack();
        }
        }
      />


    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    fontSize: 50,
    height: 100,
    width: 300
  }
});