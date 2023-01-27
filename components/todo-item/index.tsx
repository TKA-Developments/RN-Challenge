import { View, TextInput } from 'react-native'
import React, { useState, useEffect, useRef }from 'react'
import Checkbox from '../checkbox'

interface TodoItemProps {
    todo: {
        id: string;
        content: string;
        isDone: boolean;
    },

    onSubmit: () => void;
}

const TodoItem = ({ todo, onSubmit }: TodoItemProps) => {
    const [content, setContent] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const inputTodo = useRef(null)

    const onKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace' && content === '') {
            console.warn('delete');
        }
    }

    useEffect(() => {
        if (!todo) { return }
        setIsChecked(todo.isDone)
        setContent(todo.content)
    }, [todo])

    useEffect(() => {
        if (inputTodo.current) {
            inputTodo?.current?.focus()
        }
    }, [inputTodo])

    return (
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
            }}
        >

            <Checkbox 
                isChecked={isChecked}
                onPressed={() => { setIsChecked(!isChecked) }}
            />

            <TextInput
                multiline
                style={{
                    flex: 1,
                    color: 'black',
                    fontSize: 18,
                    marginStart: 8,
                }}
                ref={inputTodo}
                value={content}
                onChangeText={setContent}
                onSubmitEditing={onSubmit}
                blurOnSubmit
                onKeyPress={onKeyPress}
            />

        </View>
    )
}

export default TodoItem