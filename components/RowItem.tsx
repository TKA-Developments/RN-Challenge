import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Rating = (props) => {
    const rating = props.value % 1 == 0 ? `${props.value}.0` : `${props.value}`
    return (
        <View style={props.style}>
            <Text style={styles.rating}>
                <Ionicons name="star"/> {rating}
            </Text>
        </View>
    )
}
const navigation = createNativeStackNavigator()
export const RowItem = (props) => {
    return (
        <Card
            onPress={props.onPress}
            style={styles.card}>
            <View style={styles.containerWrapper}>
                <Image
                    style={styles.image}
                    source={{
                        uri: props.imageUrl
                    }}/>
                <View style={styles.descContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.releaseDate}>{props.releaseDate}</Text>
                </View>
                <Rating style={styles.ratingContainer} value={props.rating} />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
        flexDirection: "row",
    },
    card: {
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'orange',
    },
    image: {
        width: 64,
        height: 64,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
    },
    descContainer: {
        flex: 6,
        padding: 5,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    ratingContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        borderRadius: 2,
        padding: 5,
    },
    title: {
        color: 'black',
    },
    releaseDate: {
        color: 'black',
    },
    rating: {
        color: 'black',
    }
})
