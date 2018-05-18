import React from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, Image, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      text: null
    };
  }
  getBooksByName = () => {
          const url = 'http://192.168.0.20:3000/searchBooks';
    	    this.setState({ loading: true });
    	    fetch(url,{
            method: 'POST',
            headers: {
									'Content-Type': 'application/json',
            },
    				body: {
    					name: JSON.stringify(this.state.text)
    				}
    			})
          .then((err,res)=>{
            if(err) throw err;
            console.log(res);
            res.json();
          })
          .then(res => {
            this.setState({
              data: res,
              error: res.error || null,
              loading: false,
              refreshing: false
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
    };
  render() {
    return (
      <ImageBackground source={require('./images/bgroundbokeh.jpg')} style={styles.MainContainer}>
		        <View style={styles.flex}>
								<View>
									<TextInput style={styles.textInput } onChangeText={(text)=>this.setState({text})} id="textForSearch">
									</TextInput>
								</View>
		            <View style={styles.buttonContainer}>
		  	          <Button buttonStyle={styles.button} title="Search books" onPress={this.getBooksByName}/>
		            </View>		            
			    </View>
			    <FlatList
               data={this.state.data}
               
			   	    renderItem={({item, separators}) => (
					    <TouchableHighlight
                onShowUnderlay={separators.highlight}
                
					      onHideUnderlay={separators.unhighlight}>
					      <View style={styles.flex}>
					      	<Image
					          style={{width: 75, height: 75}}
					          source={{uri: item.imageUrl}}
					        />
					      	<View style={styles.item}>
						        <Text style={styles.text}>{item.name}</Text>
						        <Text style={styles.text}>{item.author}</Text>
						    </View>
					      </View>
					    </TouchableHighlight>
            )}
            renderRow={this.renderRow}
			      />
	    	</ImageBackground>
        
      );
     
  }
    }
   

const styles = StyleSheet.create({
	MainContainer: {
	   flex: 1,
	   justifyContent: 'center',
	   alignItems: 'center',
	   width: null,
	   height: null
	 },
    flex: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
        padding: 10
    },
    button:{
    	backgroundColor: '#00aeef',
      	borderColor: 'red'
    },
    item: {
	    padding: 10,
	    width: 250
  	},
  	text: {
	    fontSize: 18,
	   	height: 44,
	   	color: '#fff'
  	},
  	list: {

    },
    textInput:{
      width:200,
      marginTop: 25,
      marginBottom: 25
    }
    
})
