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

export default function Modal({
    categories,
    handleClose,
    addTaskHandler,
    editTaskHandler,
    type,
    initTask,
    initDate,
    initCategory,
    id,
}) {
    const [task, setTask] = useState(initTask);
    const [date, setDate] = useState(initDate);
    const [pickedCategories, setPickedCategories] = useState(initCategory);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const handlePickCategories = (category) => {
        setPickedCategories([...pickedCategories, category]);
    };

    const handleUnpickCategories = (category) => {
        setPickedCategories(
            pickedCategories.filter((item) => item != category)
        );
    };

    return (
        <View style={styles.container}>
            {type == "add" ? (
                <Text style={styles.title}>Add Task</Text>
            ) : (
                <Text style={styles.title}>Edit Task</Text>
            )}

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Your Task Name"
                value={task}
                onChangeText={setTask}
                placeholderTextColor="black"
            />
            <Text style={styles.subtitle}>Date</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
            />
            <Text style={styles.subtitle}>Categories</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CategoryPicker
                        category={item.category}
                        handlePickCategories={handlePickCategories}
                        handleUnpickCategories={handleUnpickCategories}
                        status={
                            pickedCategories.includes(item.category)
                                ? true
                                : false
                        }
                    />
                )}
            />
            <TouchableOpacity
                style={styles.add}
                onPress={
                    type == "add"
                        ? () => {
                              addTaskHandler(
                                  task,
                                  new Date(date.toDateString()),
                                  pickedCategories
                              );
                              handleClose();
                          }
                        : () => {
                              editTaskHandler(
                                  id,
                                  task,
                                  new Date(date.toDateString()),
                                  pickedCategories
                              );
                              handleClose();
                          }
                }
            >
                {type == "add" ? (
                    <Text style={styles.text}>Create Task</Text>
                ) : (
                    <Text style={styles.text}>Edit Task</Text>
                )}
            </TouchableOpacity>
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
        marginBottom: 25,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        borderLeftColor: "black",
        borderLeftWidth: 2,
        paddingLeft: 10,
        marginBottom: 10,
    },
    add: {
        marginTop: 30,
        width: "80%",
        backgroundColor: "black",
        borderRadius: 5,
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        alignSelf: "center",
    },
    text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 15,
        marginBottom: 10,
    },
});
