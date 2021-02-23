import React from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

type Props = {
  onPress: () => any;
  clearTodos: () => void;
};

export default function ClearModal({ onPress, clearTodos }: Props) {
  return (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>
        This will clear all Todos{"\n"}
        Are you sure?
      </Text>
      <Text style={styles.tipText}>
        Tip: Delete individual todos by swiping left on them.
      </Text>

      <TouchableOpacity
        style={styles.button}
        testID={"clear-button"}
        onPress={() => {
          clearTodos();
          onPress();
        }}
      >
        <Text style={styles.clearButtonText}>Clear Todos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        testID={"close-button"}
        onPress={() => {
          onPress();
        }}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  tipText: {
    fontSize: 10,
    textAlign: "center",
    color: "grey",
  },
  button: {
    // borderWidth: 2,
    // borderColor: "blue",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    color: "#147EFB",
  },
  clearButtonText: {
    fontSize: 18,
    color: "#FC3158",
  },
  inpDescription: {
    backgroundColor: "#eee",
    fontSize: 16,
    // borderWidth: 2,
    // borderColor: "blue",
    alignSelf: "stretch",
    height: 40,
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 5,
  },
});
