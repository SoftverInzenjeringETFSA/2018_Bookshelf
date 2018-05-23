import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
 } from 'react-native';

import UserComponent from './components/UserComponent';
import { AddMembersStyle as styles } from '../stylesheets/styles.js';
import { vratiSeNaPocetnu } from '../actions/ClubActions';

export default class AddMembers extends React.Component {
    constructor(props){
      super(props);
      this.state={
        userArray:[{'ime':'Selmir Satrovic'},{'ime':'Faruk Sinanovic'},{'ime':'Aldo Selimovic'}],
      }
    }
    static navigationOptions = {
      header: null
    };

  renderUsers = (users) => {
    return users.map( (val, key) => {
        return (<UserComponent key={key} keyval={key} val={val}/>)
      } )
  }

  render() {

    return (


        <View style={styles.container}>

          <View style={[styles.header]}>
            <Text style={styles.headerText}>Bookshelf</Text>
          </View>

          <TouchableOpacity onPress={ () => vratiSeNaPocetnu( this.state, this.props.navigation ) } style={styles.buttonContainer2}>
              <Text style={styles.buttonText}>ODABERI KORISNIKE</Text>
          </TouchableOpacity>

          <ScrollView style={styles.scrollContainter}>
          {this.renderUsers(this.state.userArray)}
          </ScrollView>

        </View>


    );
  }



}
