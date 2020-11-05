import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native'
import colors from '../assets/colors.js';

const backgroundImage = {
  uri: 'https://mvp-roomease.s3-us-west-1.amazonaws.com/Rotondo+Great+Room+Rendering.jpg'
};

export default function HouseholdConnect(props) {

  console.log('PROPS:', props);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.h1}>Welcome!</Text>
        <Text style={styles.paragraph}>Please create a household or join one if your roomie has already set one up.</Text>
        <AppButton title='Create A Household' buttonStyle={buttonStyles.buttonContainer} textStyle={buttonStyles.buttonText}/>
        <AppButton title='Join A Household' buttonStyle={buttonStyles.secondaryButtonContainer} textStyle={buttonStyles.secondaryButtonText}/>
      </View>
    </ImageBackground>
  )
}

// onPress={() => this.props.navigation.navigate('CreateHousehold')}

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
    color: colors.primaryBlue,
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 26,
    marginBottom: '70%',
    width: '75%',
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: colors.primaryBlue,
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
    color: colors.primaryBlue,
    alignSelf: 'center',
  }
})
