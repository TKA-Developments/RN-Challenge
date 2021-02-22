import React, { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    FlatList,
} from "react-native";
import CategoryPicker from "../components/CategoryPicker.js";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Modal({ categories }) {
    const [task, setTask] = useState("");
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Your Task Name"
                value={task}
                onChangeText={setTask}
            />
            <Text>Date</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
            />
            <Text>Categories</Text>
            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CategoryPicker category={item.category} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
        padding: 20,
    },
    title: {
        color: "#FF2225",
        fontWeight: "bold",
        fontSize: 20,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
    },
});
