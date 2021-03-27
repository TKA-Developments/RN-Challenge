import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, Animated, Modal, TouchableOpacity, TouchableHighlight, TextInput} from "react-native";
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
                    checkedColor="#007580"
                    title={item.title}
                    checked={item.isChecked}
                    onIconPress={() => checkItem(item)}
                    onPress={() => checkItem(item)}
                    />
                    <TouchableOpacity onPress={() => editItem(item)}>
                        <Feather name="edit-2" size={27} color="#282846" />
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
                        <View style={styles.editBC}>
                        <TouchableOpacity
                        style={styles.editB}
                        onPress={() => saveEdit(editValue, "save")}>
                            <Text
                            style={styles.editBT}>SAVE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.editB}
                        onPress={() => saveEdit(editValue, "discard")}>
                            <Text
                            style={styles.editBT}>
                            DISCARD</Text>
                        </TouchableOpacity>
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
        borderRadius: 5,
        height: 50,
        flexDirection: "row",
        backgroundColor: "#d8ebe4",
        alignItems: "center",
        paddingRight: 7,
        marginVertical: 5,
        elevation: 5,
        shadowColor: '#282846',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,  
    },
    itemText: {
        alignSelf: "center",
        fontSize: 18,
        color: "#282846"
    },
    cb: {
        flex: 1,
        borderWidth: 0,
        padding: 0,
        margin: 0,
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
        paddingHorizontal: 25,
        backgroundColor: "#007580"
    },
    EditTextBox: {
        flexDirection: "row",
        paddingHorizontal: 5,
        elevation: 5,
        shadowColor: '#282846',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,  
        borderRadius: 5,
        height: 50,
        backgroundColor:"#98ded9"
    },
    editText: {
        fontSize: 18,
        flex: 1,
        color: "#282846"
    },
    editBC: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    editB: {
        borderWidth: 3,
        borderColor: "#fed049",
        backgroundColor: "#fed049",
        marginHorizontal: 15,
        width: 100,
        elevation: 5,
        shadowColor: '#282846',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 2  
    },
    editBT: {
        color: "#007580",
        textAlign: "center",
        fontSize: 15,
    }
});

export default ItemCard;