import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
 } from 'react-native';

 import DatePicker from 'react-native-datepicker';


export default class ClubComponent extends React.Component {
    constructor(){
      super()
      this.state = {date: new Date()}
    }
    static navigationOptions = {
      header: null
    };
  render() {
    const { navigation } = this.props;
    let clubInfo = {
      nazivKluba: navigation.getParam('nazivKluba'),
      nazivKnjige: navigation.getParam('nazivKnjige')
    };
    console.log(clubInfo);
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>

          <View style={[styles.header]}>
            <Text style={styles.headerText}>Bookshelf</Text>
          </View>



          <View style={[styles.logoContainer]}>
            <Text style={styles.textClub}>{clubInfo.nazivKluba}</Text>
            <Text style={styles.textClub}>{clubInfo.nazivKnjige}</Text>
            <Text style={styles.textClub}>Trenutni rok za citanje knjigee</Text>
          </View>

           <View style={{ flex: 1 }}>
           <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>



          <View style={[styles.footer]}>
            <TouchableOpacity style={styles.buttonContainer2}>
              <Text style={styles.buttonText}>KREIRAJ NOVI ROK ZA CITANJE</Text>
            </TouchableOpacity>


          </View>
        </View>
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#6899e8'
  },
  boxContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textClub:{
    fontSize: 18,
    padding: 26,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
    alignSelf: 'stretch',
  },
  header:{
    backgroundColor: '#0d54c6',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  logo:{
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    textAlign:'center',
    color: '#fff',
    padding: 20,
  },
  addButton:{
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color:'#fff',
    fontSize: 24,
  },
  buttonContainer:{
    backgroundColor:'#0d54c6',
    paddingVertical:15,
    marginBottom:5
  },
  buttonContainer2:{
    backgroundColor:'#492b72',
    paddingVertical:15,
    marginBottom:5
  },
  buttonText:{
    textAlign:'center',
    color:'#ffffff'
  }
});
