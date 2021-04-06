import React, { useState } from 'react';
import {
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';

import { Text, View } from '../components/Themed';
import TodoItem from '../components/TodoItem';

export default function TabOneScreen() {
	const [newItem, setNewItem] = useState('');
	const [todoItems, setTodoItems] = useState([
		{ id: 1, title: 'Read book', done: false },
		{ id: 2, title: 'Watch TV', done: false },
		{ id: 3, title: 'Do HW', done: true },
	]);

	const onSubmit = (): void => {
		setTodoItems([
			...todoItems,
			{
				id: todoItems.length + 1,
				title: newItem,
				done: false,
			},
		]);
		setNewItem('');
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.textInput}
					placeholder="Type a new TODO item here!"
					placeholderTextColor="#fdf5e6"
					onChangeText={(text) => setNewItem(text)}
					value={newItem}
				/>
				<TouchableOpacity style={styles.newItem}>
					<Text
						style={{
							textAlign: 'center',
							paddingTop: '13%',
						}}
						onPress={onSubmit}
					>
						Add
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView>
				{todoItems.map(({ id, title, done }) => (
					<TodoItem
						id={id}
						title={title}
						done={done}
						onPress={() => {
							const index = todoItems.findIndex(
								(item) => item.id === id
							);
							todoItems[index].done = !todoItems[index].done;
							console.log(`${id} pressed`);
						}}
						key={id}
					/>
				))}
			</ScrollView>
			{/* <View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/> */}
			{/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkbox: {
		backgroundColor: '#6497b1',
		marginLeft: 'auto',
		borderWidth: 1,
		height: '100%',
		width: '20%',
		alignContent: 'center',
	},
	inputContainer: {
		width: '100%',
		justifyContent: 'center',
		marginTop: '10%',
		flexDirection: 'row',
	},
	newItem: {
		width: '20%',
		backgroundColor: '#283655',
		marginLeft: '10%',
	},
	title: {
		position: 'absolute',
		top: '5%',
		fontSize: 20,
		fontWeight: 'bold',
	},
	text: {
		alignSelf: 'flex-start',
		fontSize: 30,
		fontWeight: '400',
	},
	textInput: {
		height: 40,
		backgroundColor: '#283655',
		color: '#fdf5e6',
		textAlign: 'center',
		width: '50%',
		padding: '1%',
	},
	todoItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '80%',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
