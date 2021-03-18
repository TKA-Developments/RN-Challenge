import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';


const Loading = () => {
    const colorScheme = useColorScheme();

    return (
        <ActivityIndicator size="large" color={Colors[colorScheme].highlight} />
    );
}

export default Loading;