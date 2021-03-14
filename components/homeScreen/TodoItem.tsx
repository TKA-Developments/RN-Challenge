import React from 'react';
import { Text, View } from '../../components/Themed';
import { CheckBox } from 'react-native-elements'

export interface TodoItemProps {
    id: string,
    title: string,
    date: string,
    checked: boolean,
    category: string,
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
    const onPress = () => {
        console.log('Pressed');
    }

    return (
        <View>
            <CheckBox
                title={props.title}
                checked={props.checked}
                onPress={onPress}
            />
        </View>
    );
}

export default TodoItem;