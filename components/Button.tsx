import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface props {
    onClick: () => void;
}

const ButtonComponent:React.FC<props> = (props) => {
    return (
        <View>
            <Button 
                title="test"
                onPress={() => { props.onClick() }}
            />
        </View>
    )
}

export default ButtonComponent;