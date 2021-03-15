import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { CheckBox } from 'react-native-elements';
import { TodoContext, ITodo } from '../../contexts/TodoContext';
import { useNavigation } from '@react-navigation/native';

const TodoItem = (props: ITodo) => {
    const { updateTodo } = useContext(TodoContext);
    const navigation = useNavigation();

    const onPress = () => {
        let tempTodo = { ...props };
        tempTodo.checked = !props.checked;
        updateTodo(tempTodo);
    }

    return (
        <View>
            <CheckBox
                title={props.title}
                checked={props.checked}
                onPress={onPress}
                onLongPress={() => navigation.navigate('TodoDetail', { ...props })}
            />
        </View>
    );
}

export default TodoItem;