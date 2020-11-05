import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import colors from '../assets/colors.js';

export default function HouseholdConnect(props) {

  console.log('PROPS:', props);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome!</Text>
      <Text style={styles.paragraph}>Please create a household or join one if your roomie has already set one up.</Text>
      <AppButton title='Create A Household' buttonStyle={buttonStyles.buttonContainer} textStyle={buttonStyles.buttonText}/>
      <AppButton title='Join A Household' buttonStyle={buttonStyles.secondaryButtonContainer} textStyle={buttonStyles.secondaryButtonText}/>
    </View>
  )
}

// onPress={() => this.props.navigation.navigate('CreateHousehold')}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 200,
  },
  h1: {
    color: colors.primaryBlue,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 24,
    marginBottom: '70%',
    width: '70%',
    textAlign: 'center',
    color: colors.darkGrey,
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
    backgroundColor: colors.primaryBlue,
    borderRadius: 25,
    paddingVertical: 10,
    width: '70%',
    paddingHorizontal: 15,
    margin: 20,
  },
  secondaryButtonContainer: {
    backgroundColor: "#fff",
    borderColor: colors.primaryBlue,
    borderWidth: 2,
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
    color: colors.primaryBlue,
    alignSelf: 'center',
  }
})
