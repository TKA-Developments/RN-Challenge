import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Floating = () => {
    return (
        <View style={ styles.FloatingStyle }>

        </View>
    )
}

const styles = StyleSheet.create({
    FloatingStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "pink",
        position: "absolute",
        bottom: 20,
        right: 20,
        elevation: 5
    }
})

export default Floating;