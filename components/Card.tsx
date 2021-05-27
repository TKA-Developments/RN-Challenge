import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    data: {
        Title: string,
        Description: string
    }
}

const Card:React.FC<Props> = (props) => {
    return (
        <View>
            <Text>{ props.data.Title }</Text>
            <Text>{ props.data.Description }</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Card;