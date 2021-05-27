import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PageParamList } from '../types';
import firebase from '../firebase';

import SearchInput from '../components/SearchInput';
import Cards from '../components/Cards';
import Floating from '../components/Floating';

interface state {
    task: []
}

type Navigation = StackScreenProps<PageParamList, "Home">

class Home extends Component<Navigation, state> {
    constructor(props: any) {
        super(props);

        this.state = {
            task: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let data = firebase.database().ref('/task');
        data.once('value').then(snapshot => { 
            this.setState({ task: snapshot.val() });
        })
    }

    render() {
        return (
            <View style={ styles.HomeScreen }>
                <SearchInput />
                <Cards data={this.state.task} />
                <TouchableOpacity style={ styles.FloatingStyle } onPress={() => this.props.navigation.navigate('CreateTask')}>
                    <Floating />
                </TouchableOpacity>
            </View>
        );
    }
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