import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { CheckBox } from 'react-native-elements';
import { TodoContext, ITodo } from '../../contexts/TodoContext';
import { useNavigation } from '@react-navigation/native';
import useCachedResources from '../../hooks/useCachedResources';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

const TodoItem = (props: ITodo) => {
    const { updateTodo, getCategoryColor } = useContext(TodoContext);
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const isLoadingComplete = useCachedResources();

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
                textStyle={{
                    fontFamily: 'poppins',
                    color: Colors[colorScheme].text,
                    textDecorationLine: props.checked ? 'line-through' : 'none'
                }}
                containerStyle={{
                    backgroundColor: Colors[colorScheme].backgroundDarker,
                    borderColor: Colors[colorScheme].text,
                    borderWidth: 0.1,
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    width: '100%',
                    marginLeft: 0
                }}
                checkedColor={getCategoryColor(props.category)}
                uncheckedColor={getCategoryColor(props.category)}
            />
        </View>
    );
}

export default TodoItem;