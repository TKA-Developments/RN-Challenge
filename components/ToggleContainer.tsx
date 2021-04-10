import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../components/Themed';

export default function ToggleButton(props: {
	onPress: () => void;
	text: String;
}) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={props.onPress}>
				<Text style={styles.text}>{props.text}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E5E4E2',
		padding: 10,
		borderRadius: 10,
		borderWidth: 2,
	},
	text: {
		color: '#4a4e4d',
		fontWeight: '500',
	},
});
