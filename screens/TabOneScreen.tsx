import React, { useState, useRef, useEffect } from 'react';
import {
	Animated,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Keyboard,
} from 'react-native';

import { Text, View } from '../components/Themed';
import TodoItem from '../components/TodoItem';
import ToggleContainer from '../components/ToggleContainer';

export default function TabOneScreen() {
	const [newItem, setNewItem] = useState('');
	const [todoItems, setTodoItems] = useState([
		{ id: 1, title: 'Read book', done: false },
		{ id: 2, title: 'Watch TV', done: false },
		{ id: 3, title: 'Do HW', done: true },
	]);
	let nextId =
		Math.max.apply(
			Math,
			todoItems.map((item) => item.id)
		) + 1;

	const [viewedTodoItems, setViewedTodoItems] = useState(todoItems);

	// Event Handlers, writing and deleting todo items
	const onSubmit = (): void => {
		setTodoItems([
			...todoItems,
			{
				id: nextId,
				title: newItem,
				done: false,
			},
		]);
		setNewItem('');
		fadeIn;
		Keyboard.dismiss();
	};

	const onDelete = (id: number): void => {
		setTodoItems(todoItems.filter((item) => item.id !== id));
	};

	const setTitle = (id: number, newTitle: string): void => {
		let copy = todoItems;
		let index = copy.findIndex((item) => item.id === id);
		copy[index].title = newTitle;
		setTodoItems(copy);
	};

	// Toggle Views
	const viewAll = () => {
		setViewedTodoItems(todoItems);
		fadeIn();
	};
	const viewNotCompleted = () => {
		setViewedTodoItems(todoItems.filter((item) => item.done === false));
		fadeIn();
	};
	const viewCompleted = () => {
		setViewedTodoItems(todoItems.filter((item) => item.done === true));
		fadeIn();
	};

	// Animation variables
	const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
	const fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		fadeAnim.setValue(0);
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	useEffect(fadeIn, []);
	useEffect(() => {
		setViewedTodoItems(todoItems);
		fadeIn();
	}, [todoItems]);

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
				<TouchableOpacity style={styles.newItem} onPress={onSubmit}>
					<Text
						style={{
							textAlign: 'center',
							paddingTop: '13%',
						}}
					>
						Add
					</Text>
				</TouchableOpacity>
			</View>
			<Animated.ScrollView style={[styles.scroll, { opacity: fadeAnim }]}>
				{viewedTodoItems.map(({ id, title, done }) => (
					<TodoItem
						id={id}
						title={title}
						done={done}
						onDelete={onDelete}
						onPress={() => {
							const index = todoItems.findIndex(
								(item) => item.id === id
							);
							todoItems[index].done = !todoItems[index].done;
						}}
						setTitle={setTitle}
						key={id}
					/>
				))}
			</Animated.ScrollView>
			<View style={styles.toggleViewContainer}>
				<ToggleContainer onPress={viewAll} text={'View All'} />
				<ToggleContainer
					onPress={viewNotCompleted}
					text="View Not Completed"
				/>
				<ToggleContainer
					onPress={viewCompleted}
					text="View Completed"
				/>
			</View>
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
	scroll: {
		height: '60%',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
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
	toggleViewContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
		marginBottom: '10%',
		justifyContent: 'space-between',
	},
});
