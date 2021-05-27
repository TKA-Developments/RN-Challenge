import React from 'react';
import { View, StyleSheet } from 'react-native';

import Card from './Card';

interface Props {
    data: [];
}

const Cards:React.FC<Props> = (props) => {
    return (
        <View style={ styles.CardsStyle }>
            { props.data.map(task => { 
                return <Card data={ task } />
            }) }
        </View>
    );
}

const styles = StyleSheet.create({
    CardsStyle: {
        backgroundColor: "white",
        elevation: 1,
        borderRadius: 15,
        height: "92%",
        // height: "80%",
        top: 10
    }
})

export default Cards;