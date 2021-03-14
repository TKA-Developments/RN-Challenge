import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { CheckBox } from 'react-native-elements';
import { TodoContext, ITodo } from '../../contexts/TodoContext'

const TodoItem = (props: ITodo) => {
    const { updateTodoChecked } = useContext(TodoContext);

    const onPress = () => {
        updateTodoChecked(props.id, props.checked);
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