import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, Alert, TextInput, TouchableOpacity, StatusBar, FlatList, TouchableHighlight, Modal} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../assets/colors.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const Stack = createStackNavigator();

// function Item({expenseItem, user, cost}) {
//   return (
//     <View style={{flex: 1, flexDirection: "row", marginTop: 10, marginBottom: 10}}>
//       <View style={{ flex: 1, justifyContent: 'center'}}>
//         <Text style={styles.listExpenseItem}>{expenseItem}</Text>
//         <Text style={styles.listUser}>{user}</Text>
//       </View>
//       <Text style={styles.listCost}>{cost}</Text>
//     </View>
//   );
// }

// function Due({user, cost, paid}) {
//   return (
//     <View style={{flex: 1, flexDirection: "row", marginTop: 10, marginBottom: 10}}>
//       <View style={{ flex: 1, justifyContent: 'center'}}>
//         <Text
//           style={
//             styles.dueUser,
//             {textDecorationLine: paid ? "line-through" : "none",
//               color: paid ? colors.neutralMedium : colors.neutralDark,
//               paddingLeft: 8
//             }}>{user}
//         </Text>
//       </View>
//       <Text
//         style={
//           styles.dueCost,
//           {textDecorationLine: paid ? "line-through" : "none",
//             color: paid ? colors.neutralMedium : "black",
//             fontSize: 17
//           }}>{cost}
//       </Text>
//     </View>
//   );
// }


//Your share checkbox styling changes
// function ShareTotal({item}) {
//   const [paid, setPaid] = useState(false);
//   return (
//     <View style={styles.yourShareBox}>

//       <FontAwesome5 name="circle" size={24}
//         onPress={() => {
//           setPaid(!paid)
//         }}
//         size={24}
//         color={paid ? colors.secondary : colors.neutralMedium}
//         name={paid ? "check-circle" : "circle"}
//       />
//       <Due expenseItem={item.expenseItem} user={item.user} cost={item.cost} paid={paid}
//       />

//     </View>
//   )
// }




export default function HomeExpenseScreen (props, {navigation}) {


    // STATE:
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);
    const [itemName, setItemName] = useState('');
    const [amount, setAmount] = useState('');
    const [holder, setHolder] = useState('');
    const [paid, setPaid] = useState(false);

    const FixedList = props.expenses.map((expense, index) => {
      console.log(expense.name, expense.expenseHolder, expense.amount)
      return (
        <View key={index} style={listStyles.listItemContainer}>
          <View style={listStyles.nameAndHolderContainer}>
            <Text style={listStyles.listName}>{expense.name}</Text>
            <Text style={listStyles.listHolder}>{expense.expenseHolder}</Text>
          </View>
          <Text style={listStyles.listAmount}>${expense.amount.$numberDecimal}</Text>
        </View>
      )
    })


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
              underlayColor={colors.primaryLighter}
              style={{marginRight: 8}}
              onPress={() => {
                setAddItemModalVisible(!addItemModalVisible)
              }}
            >
                <FontAwesome5 name="plus" size={18} color="white"/>
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
              onChangeText={text => setAmount(text)}
              value={amount}
              autoCapitalize={'words'}
              placeholder={'Amount'}
              keyboardType={'numeric'}
            />
            <TouchableHighlight
              underlayColor={colors.primaryLighter}
              style={modalStyles.submitButton}
              onPress={() => {
                setAddItemModalVisible(!addItemModalVisible)
              }}
            >
              <Text style={modalStyles.textStyle}>Submit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.primaryLighter}
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

        <Text>NOVEMBER</Text>

        <Text style={{fontSize: 20, color: "gray", marginTop: 30}}>Fixed Monthly Expenses</Text>
        <View style={listStyles.listContainer}>
          {FixedList}
          </View>
          <Button title="See all fixed transactions"></Button>

        <Text style={{fontSize: 20, marginTop: 225, color: "gray"}}>Other Household Expenses</Text>
        <Button title="See all other transactions"></Button>

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
 listExpenseItem: {
    fontSize: 16,
    alignItems: "flex-start"
  },

  dueUser: {
    fontSize: 17,
  },
  yourShareBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
});

const listStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    // flexWrap: 'wrap',
    // alignItems: 'center',
  },
  listTitles: {
    borderBottomWidth: 0.5,
    borderColor: colors.neutralMedium
  },
  listItemContainer: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 0.5,
    borderColor: colors.neutralMedium,
    height: 40,
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5
  },
  nameAndHolderContainer: {
    flex: 2,
  },
  listName: {
    // marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    alignItems: "flex-start",
    color: colors.neutralDark,
  },
  listHolder: {
    fontSize: 13,
    alignItems: "flex-start",
    color: colors.secondary
  },
  listAmount: {
    fontSize: 18,
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
