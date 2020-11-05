
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import * as Google from "expo-google-app-auth";
import firebase from 'firebase';


export default class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
            );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
        .then((result) => {
          console.log('User Signed In');
          console.log('UserID:', result.user.uid);
          if (result.additionalUserInfo.isNewUser) {
            //Save each user under their own uniqueID and set details
            firebase.database().ref('/users/' + result.user.uid).set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              locale: result.additionalUserInfo.profile.locale,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name,
              created_at: Date.now()
            })
            .then((snapshot) => {
              //console.log(snapshot)
            })
          } else {
            firebase.database().ref('/users/' + result.user.uid).update({
              last_logged_in: Date.now()
            })
          }
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }



  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: '550405659559-3okccbgr0edhir1oa2qtigtecvlh5mn8.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };


  render() {
    return (
    <SafeAreaView style={styles.container}>
      <Button title="Sign In With Google" onPress={() => this.signInWithGoogleAsync()}/>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
