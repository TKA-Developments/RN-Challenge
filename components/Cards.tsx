import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Card from './Card';

interface Props {
    data: Data[];
    update: (item: any, key: string) => void;
}

interface Data {
    title: string;
    description: string;
    isFinished: boolean;
}

const Cards:React.FC<Props> = (props) => {
    return (
        <View style={ styles.CardsStyle }>
            <ScrollView style={ styles.ScrollStyle }>
                { Object.keys(props.data).map((key: any) => { 
                    return (
                        <Card data={ props.data[key] } Uniquekey={ key } update={ props.update }/>
                    )
                }) }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    CardsStyle: {
        backgroundColor: "white",
        elevation: 1,
        borderRadius: 15,
        height: "92%",
        top: 10,
        paddingVertical: 10
    },
    ScrollStyle: {
        paddingHorizontal: 10
    }
})

export default Cards;