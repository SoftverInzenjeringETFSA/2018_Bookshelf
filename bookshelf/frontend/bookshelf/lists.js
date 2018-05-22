import React, { Component } from 'react';
import { FlatList, 
		 StyleSheet, 
		 Text, 
		 View, 
		 Button, 
		 ImageBackground, 
		 Image,
		 List, 
		 Item, 
		 TouchableHighlight, 
		 TouchableOpacity,
		 Alert,
		 ListItem } from 'react-native';

export default class Lists extends Component {
	constructor(props){
	    super(props);

	    this.state = {
	      loading: false,
	      data: [],
	      page: 1,
	      seed: 1,
	      error: null,
	      refreshing: false
	    };
  	}
  	componentDidMount() {
    	//this.getReadBooks();
  	}
  	getReadBooks = () => {
		    const url = 'http://192.168.0.104:3000/myreadbooks/5afb6717544bca318651700e';
		    this.setState({ loading: true });
		    fetch(url)
		      .then(res => res.json())
		      .then(res => {
		      	if (res.length == 0) 
		      		Alert.alert(
					  'Alert',
					  'There are no read books.',
					  [
					    {text: 'OK', onPress: () => console.log('OK Pressed')},
					  ],
					  { cancelable: true }
					)
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
	getUnReadBooks = () => {
		    const url = 'http://192.168.0.104:3000/myunreadbooks/5afb6717544bca318651700e';
		    this.setState({ loading: true });
		    fetch(url)
		      .then(res => res.json())
		      .then(res => {
		      	if (res.length == 0) 
		      		Alert.alert(
					  'Alert',
					  'There are no unread books.',
					  [
					    {text: 'OK', onPress: () => console.log('OK Pressed')},
					  ],
					  { cancelable: true }
					)
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
	getRecommendedBooks = () => {
		    const url = 'http://192.168.0.104:3000/mybooks/5afb6717544bca318651700e';
		    this.setState({ loading: true });
		    fetch(url)
		      .then(res => res.json())
		      .then(res => {
		      	if (res.length == 0) 
		      		Alert.alert(
					  'Alert',
					  'There are no recommended books.',
					  [
					    {text: 'OK', onPress: () => console.log('OK Pressed')},
					  ],
					  { cancelable: true }
					)
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
  		const { navigate } = this.props.navigation;
	    return (
	    	<ImageBackground source={require('./images/bgroundbokeh.jpg')} style={styles.MainContainer}>
		        <View style={styles.flex}>
		            <View style={styles.buttonContainer}>
		  	          <Button buttonStyle={styles.button} title="Read books" onPress={() => {this.getReadBooks()}}/>
		            </View>
		            <View style={styles.buttonContainer}>
		               <Button buttonStyle={styles.button} title="Unread books" onPress={() => {this.getUnReadBooks()}}/>
		            </View>
		            <View style={styles.buttonContainer}>
		               <Button buttonStyle={styles.button} title="Recommended books" onPress={() => {this.getRecommendedBooks()}}/>
		            </View>
		            <View style={styles.buttonContainer}>
	                <TouchableOpacity onPress={() => navigate('Help')}>
	                    <Text>
	                        HELP
	                    </Text>
	                </TouchableOpacity>
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

  	}
});