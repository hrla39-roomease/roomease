import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  TouchableHighlight,
  Modal,
  Alert,
  TextInput,
  Platform,
  ScrollView,
  ActionSheetIOS
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import axios from 'axios';

import colors from '../assets/colors';

export default function ChoresNavigator(props) {
  const [date, setDate] = useState(new Date);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [newChore, setNewChore] = useState('');
  const [assignedUser, setAssignedUser] = useState('Pick a person');
  const [chores, setChores] = useState(props.chores);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const showDaysAndChores = () => {
    console.log('chorelist', chores)
    const dayInWordFormat = (day) => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day);
    const month = (month) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(month);
    let day = new Date(); //starts by today

    let week = [];
    for (let i = 0; i < 6; i++) {
      week.push({
        wordDay: dayInWordFormat(day),
        month: month(day),
        day: day.getDate(),
      })
      day.setDate(day.getDate() + 1);
    }

    return week.map((day, index) => {
      let choresOfDay = chores.filter(chore => {
        let choreDay = new Date(chore.date);
        let choreWordDay = dayInWordFormat(choreDay);
        let choreMonth = dayInWordFormat(choreDay);
        if (choreWordDay === day.wordDay) {
          return true;
        }
      })
      return (
        <View key={index}>
          <View style={mainStyles.dateHeader}>
            <Text style={mainStyles.dateText}>{day.wordDay}, {day.month} {day.day}</Text>
          </View>

          {choresOfDay.map((chore, index) => (
            <View style={mainStyles.choreContainer} key={index}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={mainStyles.choreName}>{chore.name}</Text>
                <Text style={mainStyles.choreDelete}>X</Text>
              </View>
              <Text style={mainStyles.userChore}>{chore.choreHolder}</Text>
            </View>
          ))}
        </View>
      )
    })

  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(`ios Date: ${currentDate}`);
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

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
    axios.post('http://localhost:3009/api/chore', {
      name: newChore,
      date: date,
      choreHolder: assignedUser,
      householdID: props.householdID
    })
      .then(result => console.log('success'))
      .catch(err => console.error(err));
    // setChores([...chores, {chore: newChore, due: date, assignedTo: assignedUser}])
    setNewChore('');
    setAssignedUser('Pick a person');
  }

  // TODO: update chore to complete/incomplete
  // TODO: delete chore
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView style={headerStyles.header}>
        <View style={headerStyles.left}>
          <Text style={headerStyles.headerText}></Text>
        </View>
        <View style={headerStyles.center}>
          <Text style={headerStyles.headerTitle}>Chores</Text>
        </View>
        <View style={headerStyles.right}>
          <TouchableHighlight
            underlayColor={colors.primaryLighterBlue}
            onPress={() => {
              setAddItemModalVisible(!addItemModalVisible)
            }}
          >
            <Text style={headerStyles.headerText}>Add Chore</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
      {/* MAIN SCREEN CONTENT */}
      <ScrollView>
        <View>
          {showDaysAndChores()}
        </View>

        {/* MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={addItemModalVisible}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>Add a chore to the{'\n'}chores list:</Text>
              <TextInput
                style={modalStyles.inputField}
                onChangeText={newChore => setNewChore(newChore)}
                value={newChore}
                autoCapitalize={'words'}
                placeholder={'Add chore here'}
              />
              <View>
                <Button onPress={onPress} title="Assign Chore" />
                <Text style={modalStyles.modalText}>Chore assigned to: {assignedUser}</Text>
              </View>
              {/* show date picker */}
              <TouchableHighlight style={modalStyles.datePicker}>
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
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={colors.primaryLighterBlue}
                style={modalStyles.submitButton}
                onPress={() => {
                  onSubmit();
                  setAddItemModalVisible(!addItemModalVisible);
                }}
              >
                <Text style={modalStyles.textStyle}>Submit</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={colors.primaryLighterBlue}
                style={modalStyles.cancelButton}
                onPress={() => {
                  setAddItemModalVisible(!addItemModalVisible)
                }}
              >
                <Text style={modalStyles.cancelText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
});

const mainStyles = StyleSheet.create({
  dateHeader: {
    // flex: 0,
    width: '100%',
    flexDirection: 'column',
  },
  dateText: {
    fontSize: 32,
    backgroundColor: colors.primary,
    color: '#fff',
    textAlign: 'center',
  },
  choreContainer: {
    padding: 5,
  },
  choreName: {
    fontSize: 18,
    alignItems: 'flex-start',
    width: '95%',
  },
  userChore: {
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  choreDelete: {
    alignSelf: 'flex-end',
    width: '5%',
    fontSize: 20
  },
  isComplete: {
    textDecorationLine: 'line-through',
  }
});

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

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 35,
    paddingTop: '50%',
    alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    width: '40%',
    elevation: 2,
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    width: '40%',
    elevation: 2
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cancelText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    fontSize: 24,
    // marginTop: 40,
    marginBottom: 26,
    textAlign: 'center'
  },
  inputField: {
    fontSize: 20,
    height: 45,
    borderColor: colors.neutralLight,
    borderRadius: 25,
    borderWidth: 1,
    width: '100%',
    marginBottom: 0,
    marginTop: 10,
    textAlign: 'center'
  },
  datePicker: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  }
});