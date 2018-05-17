import React from 'react'

import{
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default class UserComponent extends React.Component{
    render(){
        return(
            <View key={this.props.keyval} style={styles.note}>
                <Text style={styles.noteText}>{this.props.val.ime}</Text>

                <TouchableOpacity  style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>ODABERI</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    note:{
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteText:{
        paddingLeft: 20,
    },
    noteDelete:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white',
    },
});