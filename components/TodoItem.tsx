import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function TodoItem(props: {
	id: number;
	title: string;
	done: boolean;
	onPress: () => void;
}) {
	const [done, setDone] = useState(props.done);
	return (
		<View key={props.id} style={styles.todoItem}>
			<Text style={styles.text}>
				{props.title} {props.id}
			</Text>
			<TouchableOpacity
				style={styles.checkbox}
				onPress={() => {
					setDone(!done);
					props.onPress();
				}}
			>
				<Text style={styles.doneText}>
					{done ? 'Done' : 'Not Done'}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	checkbox: {
		backgroundColor: '#6497b1',
		marginLeft: 'auto',
		borderWidth: 1,
		height: '100%',
		width: '35%',
		alignContent: 'center',
	},
	text: {
		alignSelf: 'flex-start',
		fontSize: 25,
		fontWeight: '400',
	},
	doneText: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '500',
	},
	todoItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '80%',
		margin: '5%',
	},
});
