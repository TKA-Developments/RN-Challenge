import React from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
    data: {
        title: string,
        description: string,
        isFinished: boolean
    };
    Uniquekey: string;
    update: (item: any, key: string) => void;
}

const Card:React.FC<Props> = (props) => {
    return (
        <Animated.View style={ [styles.cardStyle, props.data.isFinished ? styles.Finished : styles.notFinished] }>
            <TouchableOpacity style={ styles.checkContainerStyle } onPress={() => {
                props.data.isFinished = props.data.isFinished ? false: true;
                props.update(props.data, props.Uniquekey)
            }}>
                { props.data.isFinished ? <Feather name="check-square" style={ styles.checkStyle } /> : <Feather name="square" style={ styles.checkStyle } /> }
            </TouchableOpacity>
            <TouchableOpacity 
                style={ styles.dataStyle } 
                onLongPress={() => {console.log("tes2")}}
                delayLongPress={4000}
            >
                <View key={ props.Uniquekey }>
                    <Text style={ (props.data.isFinished) ? styles.isFinishedText : styles.notFinishedText }>{ props.data.title }</Text>
                    <Text style={ (props.data.isFinished) ? styles.isFinishedText : styles.notFinishedText }>{ props.data.description }</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardStyle: {
        height: 60,
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: "row"
    },
    Finished: {
        backgroundColor: "#02c39a"
    },
    notFinished: {
        backgroundColor: "#fce38a"
    },
    checkContainerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    checkStyle: {
        fontSize: 25,
        padding: 10
    },
    dataStyle: {
        flex: 4,
        paddingVertical: 10,
        paddingRight: 10
    },
    isFinishedText: {
        textDecorationLine: "line-through"
    },
    notFinishedText: {
        textDecorationLine: "none"
    }
})

export default Card;