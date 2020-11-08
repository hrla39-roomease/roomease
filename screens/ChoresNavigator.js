import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  Platform,
  ScrollView,
  ActionSheetIOS
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

import colors from '../assets/colors';

export default function ChoresNavigator(props) {
  const [date, setDate] = useState(new Date);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [newChore, setNewChore] = useState('');
  const [assignedUser, setAssignedUser] = useState('Pick a person');
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const getWeek = () => {
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

    return week;

  };

  const [week, setWeek] = useState(() => getWeek());

  const showChores = week.map((day, index) => {
    const dayInWordFormat = (day) => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day);
    const month = (month) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(month);
    let choresOfDay = props.chores.filter(chore => {
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
              <Text
                style={chore.isComplete ? [mainStyles.choreName, mainStyles.isComplete] : mainStyles.choreName}

              >
                {chore.name}
              </Text>
              <Text
                style={mainStyles.icon}
              >
              <FontAwesome5
                name={chore.isComplete ? "check-circle" : "circle"}
                size={24}
                color={chore.isComplete ? colors.neutralMedium : colors.primary}
                onPress={() => toggleComplete(chore)}
                style={mainStyles.checkIcon}
              />
              </Text>
              <Text
                style={mainStyles.icon}
                onPress={() => deleteChore(chore)}
              >
                <FontAwesome5
                  name="trash-alt"
                  size={20}
                  color={colors.neutralMedium}
                  style={mainStyles.trashIcon}
                />
              </Text>
            </View>
            <Text
              style={chore.isComplete ? [mainStyles.userChore, mainStyles.isComplete] : mainStyles.userChore}
            >
              {chore.choreHolder}
            </Text>
          </View>
        ))}
      </View>
    )
  });


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
      .then(result => props.fetchData())
      .catch(err => console.error(err));

    setNewChore('');
    setAssignedUser('Pick a person');
  }

  // TODO: update chore to complete/incomplete
  const toggleComplete = (chore) => {
    axios.put(`http://localhost:3009/api/chore/${chore._id}`,
    {
      chore: chore,
      householdID: props.householdID
    })
      .then(result => props.fetchData())
      .catch(err => console.error(err));
  }
  // TODO: delete chore
  const deleteChore = (chore) => {
    axios.delete(`http://localhost:3009/api/chore/${chore._id}`, { data: { householdID: props.householdID } })
      .then(result => props.fetchData())
      .catch(err => console.error(err));
  }
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
          <TouchableOpacity
            underlayColor={colors.primaryLighterBlue}
            style={{ marginRight: 8}}
            onPress={() => {
              setAddItemModalVisible(!addItemModalVisible)
            }}
          >
            <FontAwesome5 name="plus" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* MAIN SCREEN CONTENT */}
      <ScrollView>
        <View>
          {showChores}
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

              {/* --- show date picker --- */}
              <View style={modalStyles.datePickerContainer}>
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
              </View>

              {/* --- Submit and Cancel Buttons --- */}
              <View style={modalStyles.buttonsContainer}>
                <TouchableHighlight
                  underlayColor={colors.primaryLighter}
                  style={modalStyles.cancelButton}
                  onPress={() => {
                    setAddItemModalVisible(!addItemModalVisible)
                  }}
                >
                  <Text style={modalStyles.cancelText}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={colors.primaryLighter}
                  style={modalStyles.submitButton}
                  onPress={() => {
                    onSubmit();
                    setAddItemModalVisible(!addItemModalVisible);
                  }}
                >
                  <Text style={modalStyles.textStyle}>Submit</Text>
                </TouchableHighlight>
              </View>
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
  },
});

const mainStyles = StyleSheet.create({
  dateHeader: {
    width: '100%',
    flexDirection: 'column',
    borderBottomColor: colors.neutralMedium,
  },
  dateText: {
    fontSize: 32,
    backgroundColor: colors.primary,
    color: '#fff',
    textAlign: 'center',
  },
  choreContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    borderBottomWidth: 0.5,
    borderColor: colors.neutralMedium,
  },
  choreName: {
    fontSize: 18,
    alignItems: 'flex-start',
    width: '84%',
  },
  icon: {
    flex: 1,
    textAlign: 'center',

  },
  userChore: {
    fontSize: 14,
  },
  checkIcon: {
    fontSize: 24,
  },
  trashIcon: {
    fontSize: 24,
  },
  isComplete: {
    textDecorationLine: 'line-through',
    color: colors.neutralMedium,
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
    paddingBottom: 12,
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
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    width: '40%',
    elevation: 2,
    marginLeft: 4,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    width: '40%',
    elevation: 2,
    marginRight: 4,
    flex: 1
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
    marginBottom: 24,
    marginTop: 10,
    textAlign: 'center'
  },
  datePicker: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  }
});