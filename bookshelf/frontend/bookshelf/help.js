import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Linking
} from 'react-native';

export default class Help extends Component {
    static navigationOptions = {
      title: 'Bookshlef'
    };
    render() {
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                	<Text>HELP</Text>
                </View>
                <ScrollView>
                    <Text style={styles.Text}>
                        Softversko rješenje za evidenciju kluba knjige.
                        Za više informacija kliknite 
                    </Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/SoftverInzenjeringETFSA/2018_bookshelf')}>
                    	OVDJE.
                    </Text>
                </ScrollView> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header:{
        flex:0.1,
        backgroundColor: '#2d63b7' ,
        alignItems : 'flex-start',
        justifyContent:'center'
    },
    Text:{
        fontSize:15
    },
    link:{
        color:'#3983f9'
    }
});