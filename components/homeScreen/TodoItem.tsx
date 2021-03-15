import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { CheckBox } from 'react-native-elements';
import { TodoContext, ITodo } from '../../contexts/TodoContext';
import { useNavigation } from '@react-navigation/native';

const TodoItem = (props: ITodo) => {
    const { updateTodoChecked } = useContext(TodoContext);
    const navigation = useNavigation();

    const onPress = () => {
        updateTodoChecked(props.id, props.checked);
    }

    return (
        <View>
            <CheckBox
                title={props.title}
                checked={props.checked}
                onIconPress={onPress}
                onPress={() => navigation.navigate('TodoDetail', { ...props })}
            />
        </View>
    );
}

export default TodoItem;