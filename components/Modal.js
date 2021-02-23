import React, { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    FlatList,
    Alert,
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

    const emptyNameAlert = () =>
        Alert.alert("Empty Task Name", "Please specify a name for your task.", [
            {
                text: "Ok",
                onPress: () => {},
            },
        ]);

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
                placeholderTextColor="#C8CDE0"
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
                    task != ""
                        ? type == "add"
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
                        : () => emptyNameAlert()
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
        color: "#0C7EE9",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 25,
    },
    inputStyle: {
        flex: 1,
        fontSize: 20,
        borderLeftColor: "#1688F3",
        borderLeftWidth: 2,
        paddingLeft: 10,
        marginBottom: 10,
    },
    add: {
        marginTop: 50,
        width: "80%",
        backgroundColor: "#0B73D5",
        borderRadius: 5,
        elevation: 8,
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
        fontSize: 17,
        marginTop: 20,
        marginBottom: 10,
        color: "#3F4972",
    },
});
