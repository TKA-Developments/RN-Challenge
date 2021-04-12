import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import axios from 'axios';

import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
	const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=bf85cac6e4d373d44125502aa35477e5`;
	const getWeatherInfo = async () => {
		axios
			.get(weatherApiUrl)
			.then(function (response) {
				// handle success
				// Converting from Kelvin to Celsius
				setTemperature(Math.floor(response.data.main.feels_like - 273));
				setWeatherIconId(response.data.weather[0].icon);
				setWeather(response.data.weather[0].main);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	};
	getWeatherInfo();

	const [temperature, setTemperature] = useState<number>(0);
	const [weatherIconId, setWeatherIconId] = useState('');
	const [weather, setWeather] = useState('');

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 40, textAlign: 'center', padding: '5%' }}>
				It's {temperature}°C outside right now!
			</Text>
			<Text style={{ fontSize: 40, textAlign: 'center', padding: '5%' }}>
				The weather is: {weather}
			</Text>
			<Image
				style={{
					backgroundColor: '#ffffff',
					width: '30%',
					height: '10%',
				}}
				source={{
					uri: `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
