import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SearchInput from '../components/SearchInput';
import Cards from '../components/Cards';

function Home() {
    return (
        <View style={ styles.HomeScreen }>
            <SearchInput />
            <Cards />
        </View>
    );
}

const styles = StyleSheet.create({
    HomeScreen: {
        padding: 10
    }
});

export default Home;