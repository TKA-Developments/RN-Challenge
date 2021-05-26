import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PageParamList } from '../types';

import SearchInput from '../components/SearchInput';
import Cards from '../components/Cards';
import Floating from '../components/Floating';

function Home({navigation}: StackScreenProps<PageParamList>) {
    return (
        <View style={ styles.HomeScreen }>
            <SearchInput />
            <Cards />
            <TouchableOpacity style={ styles.FloatingStyle } onPress={() => navigation.navigate('CreateTask')}>
                <Floating />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    HomeScreen: {
        padding: 10
    },
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
});

export default Home;