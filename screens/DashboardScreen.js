
import React, { Component }from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default class DashboardScreen extends React.Component {
  render() {
    return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
