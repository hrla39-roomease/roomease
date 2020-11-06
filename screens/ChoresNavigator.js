import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput, Platform, ScrollView, ActionSheetIOS} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';


// const Stack = createStackNavigator();

// function HomeChoresScreen({navigation}) {
//   // console.log('chores navigation', navigation);
//   return (
//     <View style={styles.container}>
//     <Text>Hello Chores</Text>
//     {/* Today chores */}
//     {/* Tomorrow chores */}
//     {/* More chores */}
//     </View>
//   )
// }


export default function ChoresNavigator(props) {
  // console.log(`chores:`, props);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [newChore, setNewChore] = useState('');
  const [assignedUser, setAssignedUser] = useState('Pick a person');
  const [chores, setChores] = useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(`${date}`);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // const submitDate = () => {
  //   setShow(false);
  //   console.log(date);
  // }

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Alvin", "Alphina", "Nick"],
        destructiveButtonIndex: 4,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setAssignedUser('Alvin')
        } else if (buttonIndex === 2) {
          setAssignedUser('Alphina')
        } else if (buttonIndex === 3) {
          setAssignedUser('Nick')
        }
      }
    );

    const onSubmit = () => {
      setChores([...chores, {chore: newChore, due: date, assignedTo: assignedUser}])
      setNewChore('');
      setAssignedUser('Pick a person');
    }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {chores.map(chore => (
          <Text> {chore.chore} Finish on {`${chore.due}`} {chore.assignedTo} </Text>
        ))}
      </ScrollView>
      <Text style={styles.text}>Add New Chore!</Text>
      <TextInput
        style={{ height: 40, backgroundColor: 'lightgray', textAlign: 'center' }}
        placeholder="Wash the dishes"
        onChangeText={newChore => setNewChore(newChore)}
        defaultValue={newChore}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View >
        <Button onPress={onPress} title="Assign Chore" />
        <Text>Chore assigned to: {assignedUser}</Text>
      </View>
      <View>
        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
        <Button onPress={onSubmit} title="submit" />
      </View>
      {/* Today chores */}
      {/* Tomorrow chores */}
      {/* More chores */}
    </SafeAreaView>


    // <Stack.Navigator>
    //   <Stack.Screen name="Chores" component={HomeChoresScreen} />
    // </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  }
});