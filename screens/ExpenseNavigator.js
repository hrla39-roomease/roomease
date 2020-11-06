import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput, TouchableOpacity, StatusBar, FlatList, TouchableHighlight, Modal} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../assets/colors.js';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

const FixedExpenses = [
  {
    id: "1",
    expenseItem: "Rent",
    user: "Alphina",
    cost: "$3,200.00"
  },
  {
    id: "2",
    expenseItem: "Water",
    user: "Alvin",
    cost: "$64.35"
  },
  {
    id: "3",
    expenseItem: "Internet",
    user: "Nick",
    cost: "$75.99"
  }
];

const OtherExpenses = [
  {
    id: "1",
    expenseItem: "Costco Run",
    user: "Alphina",
    cost: "$105.60"
  },
  {
    id: "2",
    expenseItem: "Pizza Night",
    user: "Alvin",
    cost: "$42.89"
  },
  {
    id: "3",
    expenseItem: "Concert Tickets",
    user: "Nick",
    cost: "$455.03"
  }
];

const YourShare = [
  {
    id: "1",
    expenseItem: "Costco Run",
    user: "Alphina",
    cost: "$105.60"
  },
  {
    id: "2",
    expenseItem: "Pizza Night",
    user: "Alvin",
    cost: "$42.89"
  },
  {
    id: "3",
    expenseItem: "Concert Tickets",
    user: "Nick",
    cost: "$455.03"
  }
];

function Item({expenseItem, user, cost}) {
  return (
    <View style={{flex: 1, flexDirection: "row", marginTop: 10, marginBottom: 10}}>
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text style={styles.listExpenseItem}>{expenseItem}</Text>
        <Text style={styles.listUser}>{user}</Text>
      </View>
      <Text style={styles.listCost}>{cost}</Text>
    </View>
  );
}


export default function HomeExpenseScreen ({navigation}) {

    // STATE:
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);
    const [itemName, setItemName] = useState('');
    const [cost, setCost] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={headerStyles.header}>
          <View style={headerStyles.left}>
            <Text style={headerStyles.headerText}></Text>
          </View>
          <View style={headerStyles.center}>
            <Text style={headerStyles.headerTitle}>Expenses</Text>
          </View>
          <View style={headerStyles.right}>
            <TouchableHighlight
              underlayColor={colors.primaryLighterBlue}
              onPress={() => {
                setAddItemModalVisible(!addItemModalVisible)
              }}
            >
              <Text style={headerStyles.headerText}>+</Text>
            </TouchableHighlight>
          </View>
      </SafeAreaView>



      <Modal
        animationType="slide"
        transparent={true}
        visible={addItemModalVisible}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>What did you buy today?</Text>
            <TextInput
              style={modalStyles.inputField}
              onChangeText={text => setItemName(text)}
              value={itemName}
              autoCapitalize={'words'}
              placeholder={'Item'}
            />
            <TextInput
              style={modalStyles.inputField}
              onChangeText={text => setCost(text)}
              value={cost}
              autoCapitalize={'words'}
              placeholder={'Cost'}
              keyboardType={'numeric'}
            />
            <TouchableHighlight
              underlayColor={colors.primaryLighterBlue}
              style={modalStyles.submitButton}
              onPress={() => {
                setAddItemModalVisible(!addItemModalVisible)
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





      <View style={styles.container, {marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10}}>

        <Text style={{fontSize: 20, color: "gray", marginTop: 30}}>Fixed Monthly Expenses</Text>
        <FlatList data={FixedExpenses} renderItem={({item}) => (
          <Item expenseItem={item.expenseItem} user={item.user} cost={item.cost}/>
        )}/>

        <Text style={{fontSize: 20, marginTop: 30, color: "gray"}}>Other Household Expenses</Text>
        <FlatList data={OtherExpenses} renderItem={({item}) => (
          <Item expenseItem={item.expenseItem} user={item.user} cost={item.cost}/>
        )}/>

        <Text style={{fontSize: 20, marginTop: 30, color: "gray"}}>Your Share</Text>

        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  addButton: {
    fontSize: 200
  },
  listItem: {
    flexDirection: "row",
  },
 listExpenseItem: {
    fontSize: 16,
    alignItems: "flex-start"
  },
  listUser: {
    fontSize: 12,
    alignItems: "flex-start",
    color: colors.secondary
  },
  listCost: {
    fontSize: 17,
    alignItems: "flex-end"
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
    marginTop: 8
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
    marginBottom: 0,
    marginTop: 10,
    textAlign: 'center'
  }
});
