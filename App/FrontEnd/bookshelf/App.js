import React, { Component } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	TextInput,
	ImageBackground,
	Image,
	List,
	Item,
	Picker,
	TouchableHighlight,
	ListItem,
	TouchableOpacity
} from 'react-native';

import { FormLabel, FormInput, Input, FormValidationMessag, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

export default class FlatListDemo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imeInput: '',
			prezimeInput: '',
			emailInput: '',
			dateInput: '',
			spolInput: '',
			usernameInput: '',
			sifra: '',
			loading: false,
			data: [],
			page: 1,
			seed: 1,
			error: null,
			refreshing: false,
		};
	}
	componentDidMount() {

	}

	render() {
		return (
			<ImageBackground source={require('./images/bground.jpg')} style={styles.MainContainer}>


				<View style={styles.container}>

					<Text h3 style={styles.text}>Popunite prazna polja ličnim podacima</Text>

					<TextInput
						style={{ height: 60, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
						onChangeText={(text) => this.setState({ imeInput: text })}
						value={this.state.imeInput}
						placeholder="Ime"
						underlineColorAndroid="transparent"
					/>

					<TextInput
						style={{ height: 40, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
						onChangeText={(text) => this.setState({ prezimeInput: text })}
						value={this.state.prezimeInput}
						placeholder="Prezime"
						underlineColorAndroid="transparent"
					/>

					<TextInput
						style={{ height: 40, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
						onChangeText={(text) => this.setState({ emailInput: text })}
						value={this.state.emailInput}
						placeholder="E-mail"
						underlineColorAndroid="transparent"
					/>

					<DatePicker
						style={{ borderWidth: 0, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
						date={this.state.dateInput}
						showIcon={true}
						mode="date"
						placeholder="Datum rođenja"
						format="YYYY-MM-DD"
						minDate="1920-01-01"
						maxDate="2018-05-18"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0,
							},
							dateInput: {
								marginLeft: 36,
								borderWidth: 0,
							}
						}}
						onDateChange={(date) => { this.setState({ dateInput: date }) }}
					/>

					<Picker
						selectedValue={this.state.spolInput}
						style={{ height: 40, width: 320, color: 'black', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
						onValueChange={(itemValue, itemIndex) => {this.setState({ spolInput: itemValue }, () => { console.log(this.state.spolInput)})}}>
						<Picker.Item style={{ color: 'white' }} label="Muško" value="male" />
						<Picker.Item style={{ color: 'white' }} label="Žensko" value="female" />
					</Picker>

					<TextInput
						style={{ height: 40, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
						onChangeText={(text) => this.setState({ usernameInput: text })}
						value={this.state.usernameInput}
						placeholder="Korisničko ime"
						underlineColorAndroid="transparent"
					/>

					<TextInput
						style={{ height: 40, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}
						onChangeText={(text) => this.setState({ sifra: text })}
						value={this.state.sifra}
						placeholder="Šifra"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
					/>

					<Button
						buttonStyle={styles.btnRegister}
						onPress={() => {
							console.log(this.state.dateInput);
							console.log(this.state.spolInput);
							
							
							var data = {
								name: this.state.imeInput,
								last_name: this.state.prezimeInput,
								email: this.state.emailInput,
								birth_date: this.state.dateInput,
								gender: this.state.spolInput,
								username: this.state.usernameInput,
								password: this.state.sifra
							}
							fetch("http://192.168.1.110:3000/users", {
								method: "POST",
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(data)
							})
								.then(function (response) {
									console.log(response.json());
								})
						}}
						title="REGISTRUJ SE"
						color="black"
					/>


				</View>

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
	button: {
		backgroundColor: '#00aeef',
		borderColor: 'red'
	},
	item: {
		padding: 10,
		width: 250
	},
	text: {
		fontSize: 16,
		color: 'white',
		marginLeft: 10
	},
	input: {
		borderBottomColor: 'white',
		backgroundColor: 'red'
	},
	container: {

		justifyContent: 'center',
		marginTop: 5,
		padding: 20,
	},

	btnRegister: {
		height: 40,
		width: 280,
		backgroundColor: 'rgba(255,255,255,0.5)',
		marginTop: 20
	}

});