import React from 'react'

import{
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';



export default class UserComponent extends React.Component{

    state={
        toggle:false
    }

    _onPress(){
        const newState=!this.state.toggle;
        this.setState({toggle:newState})
    }

    render(){

        const {toggle}=this.state;

        const textValue=toggle?"UKLONI":"ODABERI";
        const buttonColor=toggle?"dodgerblue":"#2980b9";
       

        return(
            <View key={this.props.keyval} style={styles.note} >
                <Text style={styles.noteText}>{this.props.val.ime}</Text>

                <TouchableOpacity onPress={()=>this._onPress()}
                style={{
                    backgroundColor:buttonColor,
                    position: 'absolute', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    top: 10,
                    right: 10,}}>
                    <Text style={styles.noteDeleteText}>{textValue}</Text>
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
        padding: 10,
        top: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white',
    },
});