import {
  StyleSheet
 } from 'react-native';


const AddMembersStyle = StyleSheet.create({
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
    buttonContainer:{
      backgroundColor:'#0d54c6',
      paddingVertical:15,
      marginBottom:5
    },
    buttonContainer2:{
      backgroundColor:'#492b72',
      paddingVertical:15,
      marginBottom:5,
      marginTop:5,
    },
    buttonText:{
      textAlign:'center',
      color:'#ffffff'
    },
    scrollContainter: {
        flex: 1,
        marginBottom: 10,
    }
  });

export{ AddMembersStyle };
