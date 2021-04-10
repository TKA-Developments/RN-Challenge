import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Keyboard,
} from 'react-native';
import { AntDesign, Entypo, EvilIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';

export default function TodoItem(props: {
	id: number;
	title: string;
	done: boolean;
	onPress: () => void;
	onDelete: (id: number) => void;
	setTitle: (id: number, newTitle: string) => void;
}) {
	const [done, setDone] = useState(props.done);
	const [text, setText] = useState(props.title);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		props.setTitle(props.id, text);
		Keyboard.dismiss();
	}, [editing]);

	return (
		<View key={props.id} style={styles.todoItem}>
			<TouchableOpacity
				onPress={() => setEditing(!editing)}
				style={{ width: '100%' }}
			>
				{!editing ? (
					<Text style={styles.text}>{text}</Text>
				) : (
					<TextInput
						style={styles.textInput}
						placeholder="New title goes here!"
						placeholderTextColor="#fdf5e6"
						value={text}
						onChangeText={(t) => setText(t)}
					/>
				)}
			</TouchableOpacity>
			<View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
				<TouchableOpacity
					style={styles.checkBox}
					onPress={() => {
						setDone(!done);
						props.onPress();
					}}
				>
					{done ? (
						<AntDesign name="check" size={32} color="white" />
					) : (
						<Entypo name="cross" size={32} color="white" />
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.deleteContainer}
					onPress={() => {
						props.onDelete(props.id);
					}}
				>
					<EvilIcons name="trash" size={32} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	checkBox: {
		// backgroundColor: '#E5E4E2',
		padding: 5,
		alignContent: 'center',
	},
	deleteContainer: {
		padding: 5,
		alignContent: 'center',
	},
	text: {
		alignSelf: 'flex-start',
		fontSize: 25,
		fontWeight: '400',
		marginRight: 150,
	},
	textInput: {
		height: 40,
		backgroundColor: '#283655',
		color: '#fdf5e6',
		textAlign: 'left',
		width: '50%',
		padding: '1%',
	},
	doneText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#4a4e4d',
		fontWeight: '500',
	},
	todoItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '90%',
		margin: '5%',
	},
});
