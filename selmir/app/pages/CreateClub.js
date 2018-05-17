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

import { createBookClub } from '../actions/ClubActions';

const Logo = require('../assets/Logo.jpg');

export default class CreateClub extends React.Component {
  constructor(){
    super();

    this.state = {
      nazivKluba: '',
      nazivKnjige: ''
    }
    this.navigateTo = this.navigateTo.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  navigateTo = ( routeName, params ) => {
    this.props.navigation.navigate( routeName, params || {} );
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>

          <View style={[styles.header]}>
            <Text style={styles.headerText}>Bookshelf</Text>
          </View>

          <View style={[styles.logoContainer]}>
            <Image style={styles.logo}
             source={Logo}/>
          </View>

          <View style={[styles.footer]}>

            <TextInput
              style={styles.textInput}
              placeholder='Naziv kluba knjige'
              placeholderTextColor='white'
              underlineColorAndroid='#000000'
              onChangeText={ (text) => this.setState({nazivKluba: text}) }
            />

            <TextInput
              style={styles.textInput}
              placeholder='Naziv knjige'
              placeholderTextColor='white'
              underlineColorAndroid='#000000'
              onChangeText={ (text) => this.setState({nazivKnjige: text}) }
            />

            <TouchableOpacity style={styles.buttonContainer}>
              <Text onPress={ () => this.navigateTo('AddMembers') } style={styles.buttonText}>DODAJ CITAOCE U KLUB</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer2}>
              <Text onPress={ () => createBookClub( this.state, this.props.navigation ) } style={styles.buttonText}>KREIRAJ KLUB KNJIGE</Text>
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
