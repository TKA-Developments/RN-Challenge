import { Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface CheckboxProps {
    isChecked: boolean
    onPressed: () => void
};

const Checkbox = (props: CheckboxProps) => {
    const {onPressed, isChecked} = props
    const checkboxState = isChecked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'

    return (
        <Pressable onPress={onPressed}>
            <MaterialCommunityIcons name={checkboxState} size={24} color="black" />
        </Pressable>
    )
};

export default Checkbox;