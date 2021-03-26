import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, Animated, Modal, TouchableOpacity, TextInput} from "react-native";
import {CheckBox} from "react-native-elements";
import {Feather} from '@expo/vector-icons';
import Swipeable from "react-native-gesture-handler/Swipeable";

const ItemCard = ({array, deleteItem, checkItem, editItem, saveEdit}) => {
    const [editValue, setEditValue] = useState("");

    const rightSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });

        return (
            <View style={styles.delete}>
                <Animated.Text style={[styles.deleteText, {transform: [{scale}]}]}>DELETE</Animated.Text>
            </View>
        )
    }

    return <FlatList 
    keyExtractor={(item) => item.title}
    data={array} 
    renderItem={({item}) => {
        return (
            <View>
                <Swipeable
                renderRightActions={rightSwipe}
                onSwipeableRightOpen={() => deleteItem(item.title)}>
                <View style={styles.container}>
                    <CheckBox 
                    containerStyle={styles.cb}
                    textStyle={styles.itemText}
                    checkedColor="#fed049"
                    title={item.title}
                    checked={item.isChecked}
                    onIconPress={() => checkItem(item)}
                    onPress={() => checkItem(item)}
                    />
                    <TouchableOpacity onPress={() => editItem(item)}>
                        <Feather name="edit-2" size={25} color="#d8ebe4" />
                    </TouchableOpacity>
                </View>
                </Swipeable>
                <Modal animationType="fade" visible={item.isModalVisible}>
                    <View style={styles.editScreen}>
                        <View style={styles.EditTextBox}>
                        <TextInput 
                        autoCorrect={false}
                        onChangeText={(value) => setEditValue(value)}
                        placeholder="Change Task"
                        style={styles.editText}
                        />
                        </View>
                        <View style={styles.editButtons}>
                        <Text
                        style={styles.editButtonsText}
                        onPress={() => saveEdit(editValue, "save")}>
                            SAVE
                        </Text>
                        <Text
                        style={styles.editButtonsText}
                        onPress={() => saveEdit(editValue, "discard")}>
                        DISCARD</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }}
    />
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderRadius: 5,
        borderColor: "#d8ebe4",
        flexDirection: "row",
        backgroundColor: "#007580",
        alignItems: "center",
        paddingRight: 5,
        marginVertical: 5
    },
    itemText: {
        alignSelf: "center",
        fontSize: 18,
        color: "#d8ebe4"
    },
    cb: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: "transparent"
    },
    delete: {
        backgroundColor: "#e40017",
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 1,
        paddingRight: 5,
        borderRadius: 5,
        marginVertical: 5
    },
    deleteText: {
        fontWeight: "bold",
        color: "#fed049"
    },
    editScreen: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 25
    },
    EditTextBox: {
        flexDirection: "row",
        borderWidth: 3,
        height: 50,
    },
    editText: {
        fontSize: 18,
        flex: 1
    },
    editButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editButtonsText: {
        borderWidth: 3,
        marginHorizontal: 10,
        width: 100,
        textAlign: "center",
        fontSize: 18
    }
});

export default ItemCard;