import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TodoContext } from '../contexts/TodoContext';
import { AntDesign } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { Text, TextSemiBold, TextMedium, TextLight, View } from '../components/Themed';

const TodoDetailScreen = ({ navigation, route }: StackScreenProps<RootStackParamList, 'TodoDetail'>) => {
    const props = route.params;
    const colorScheme = useColorScheme();
    const { deleteTodo, getCategoryColor, updateTodo } = useContext(TodoContext);

    const onPressDelete = () => {
        Alert.alert(
            'Delete this task?',
            'Deleted task cannot be recovered',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        await deleteTodo(props.id);
                        navigation.navigate('Home');
                    }
                }
            ]
        )
    }

    const onPressEdit = () => {
        navigation.push('AddTodo', { ...props });
    }

    const onPressMarkAsDone = () => {
        let tempTodo = { ...props };
        tempTodo.checked = !props.checked;
        updateTodo(tempTodo);
        navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: Colors[colorScheme].backgroundDarkest
            }}>
                <View style={{
                    ...styles.leftHeaderContainer,
                    backgroundColor: Colors[colorScheme].backgroundDarkest
                }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <AntDesign name='close' size={28} color={Colors[colorScheme].text} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    ...styles.rightHeaderContainer,
                    backgroundColor: Colors[colorScheme].backgroundDarkest,
                }}>
                    <TouchableOpacity onPress={onPressEdit}>
                        <AntDesign name='edit' size={28} color={Colors[colorScheme].text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressDelete} style={styles.buttonContainer}>
                        <AntDesign name='delete' size={28} color={Colors[colorScheme].text} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <FontAwesome name={props.checked ? 'check-square-o' : 'square-o'} size={30} color={getCategoryColor(props.category)} />
                    <TextSemiBold style={styles.titleText}>{props.title}</TextSemiBold>
                </View>
                <View style={{
                    height: 0.5,
                    backgroundColor: Colors[colorScheme].textDarkest,
                    marginVertical: 10
                }}></View>
                <View style={styles.infoContainer}>
                    <FontAwesome5 name='clock' size={20} color={Colors[colorScheme].highlighDarker} />
                    <TextMedium style={styles.infoText}>{props.date}</TextMedium>
                </View>
                <View style={styles.infoContainer}>
                    <FontAwesome name='tasks' size={20} color={Colors[colorScheme].highlighDarker} />
                    <TextMedium style={styles.infoText}>{props.category}</TextMedium>
                </View>
                <View style={{
                    height: 0.3,
                    backgroundColor: Colors[colorScheme].textDarkest,
                    marginBottom: 15,
                }}></View>
                {/* <View style={styles.descriptionContainer}>
                    <FontAwesome name='book' size={20} color={Colors[colorScheme].highlighDarker} />
                    <TextLight style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</TextLight>
                </View> */}
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={onPressMarkAsDone}>
                <TextSemiBold>Mark as {props.checked ? 'Undone' : 'Done'}</TextSemiBold>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
    },
    leftHeaderContainer: {

    },
    rightHeaderContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        marginLeft: 10,
    },
    contentContainer: {
        padding: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        letterSpacing: 1,
        marginLeft: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginLeft: 30,
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 13,
        marginLeft: 30,
        flex: 1
    },
    actionButton: {
        position: 'absolute',
        bottom: 20,
        right: 30,
    }
});

export default TodoDetailScreen;