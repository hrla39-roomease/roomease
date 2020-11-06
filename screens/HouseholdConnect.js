import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import axios from "axios";

import colors from '../assets/colors.js';

const backgroundImage = {
  uri: 'https://mvp-roomease.s3-us-west-1.amazonaws.com/Rotondo+Great+Room+Rendering.jpg'
};

export default function HouseholdConnect(props) {

  const { navigation } = props;
  const firstName = navigation.getParam('firstName', '');
  const id = navigation.getParam('id', '');

  const [
    createHouseholdModalVisible,
    setCreateHouseholdModalVisible
  ] = useState(false);
  const [
    joinHouseholdModalVisible,
    setJoinHouseholdModalVisible
  ] = useState(false);
  const [householdName, setHouseholdName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >

      <Modal
        animationType="slide"
        transparent={true}
        visible={createHouseholdModalVisible}
        // onRequestClose={() => {
        //   do something
        // }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Please choose a name{'\n'}for your household:</Text>
            <TextInput
              style={modalStyles.inputField}
              onChangeText={text => setHouseholdName(text)}
              value={householdName}
              autoCapitalize={'words'}
              placeholder={'Household Name'}
            />
            <TouchableHighlight
              underlayColor={colors.primaryLighter}
              style={modalStyles.submitButton}
              onPress={() => {
                axios.post('http://localhost:3009/api/household', {
                  name: householdName,
                  householdOwner: firstName,
                  userID: id,
                })
                  .then((result) => {
                    props.navigation.navigate('DashboardScreen');
                  })
                  .catch((err) => console.error(err));
                setCreateHouseholdModalVisible(!createHouseholdModalVisible)}
              }
            >
              <Text style={modalStyles.textStyle}>Submit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.primaryLighter}
              style={modalStyles.cancelButton}
              onPress={() => {
                setCreateHouseholdModalVisible(!createHouseholdModalVisible)}
              }
            >
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={joinHouseholdModalVisible}
        // onRequestClose={() => {
          // do something
        // }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Paste your invite code:</Text>
            <TextInput
              style={modalStyles.inputField}
              onChangeText={text => setInviteCode(text)}
              value={inviteCode}
              autoCapitalize={'words'}
              placeholder={'Invite Code'}
            />
            <TouchableHighlight
              underlayColor={colors.primaryLighter}
              style={modalStyles.submitButton}
              onPress={() => {
                axios.get(`http://localhost:3009/api/household/${inviteCode}`)
                  .then((household) => {
                    axios.put(`http://localhost:3009/api/user/${id}`, {
                      householdID: household.data._id,
                      firstName: firstName
                    })
                    .then((result) => {
                      props.navigation.navigate('DashboardScreen');
                      })
                      .catch((err) => console.error(err));
                  })
                  .catch((err) => console.error(err));
                  setJoinHouseholdModalVisible(!joinHouseholdModalVisible)}
              }
            >
              <Text style={modalStyles.textStyle}>Submit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.primaryLighter}
              style={modalStyles.cancelButton}
              onPress={() => {
                setJoinHouseholdModalVisible(!joinHouseholdModalVisible)}
              }
            >
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <View style={styles.overlay}>
        <Text style={styles.h1}>Welcome!</Text>
        <Text style={styles.paragraph}>Please create a household{'\n'}or join one if your roomie{'\n'}has already set one up.</Text>
        <AppButton title='Create A Household' onPress={() => setCreateHouseholdModalVisible(true)} buttonStyle={buttonStyles.buttonContainer} textStyle={buttonStyles.buttonText}/>
        <AppButton title='Join A Household' onPress={() => setJoinHouseholdModalVisible(true)} buttonStyle={buttonStyles.secondaryButtonContainer} textStyle={buttonStyles.secondaryButtonText}/>
      </View>
    </ImageBackground>
  )
}

// Routes needed:
  // Get household by _id
  // Put household to user

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    alignItems: 'center',
    justifyContent: "center"
  },
  h1: {
    color: colors.primary,
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 26,
    marginBottom: '70%',
    width: '75%',
    textAlign: 'center',
    color: colors.neutralDark,
  },
})

const AppButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity
    onPress={onPress}
    style={buttonStyle}
  >
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    width: '70%',
    paddingHorizontal: 15,
    margin: 20,
  },
  secondaryButtonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    width: '70%',
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    alignSelf: 'center',
  },
  secondaryButtonText: {
    fontSize: 24,
    color: colors.primary,
    alignSelf: 'center',
  }
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
    marginTop: 70,
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
    marginBottom: 16,
    marginTop: 10,
    textAlign: 'center'
  }
});
