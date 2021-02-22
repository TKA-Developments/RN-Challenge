import React from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

type Props = {
  onPress: () => any,
  inpDescription: string,
  setInpDescription: React.Dispatch<React.SetStateAction<string>>,
  addTodo: (inp: string) => void,
};

export default function AddModal({
  onPress,
  inpDescription,
  setInpDescription,
  addTodo,
}: Props) {
  return (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Enter a description:</Text>
      <TextInput
        style={styles.inpDescription}
        value={inpDescription}
        autoCorrect={false}
        onChangeText={(n: string) => setInpDescription(n)}
      />
      <TouchableOpacity
        style={styles.button}
        testID={"save-button"}
        onPress={() => {
          if (inpDescription.length > 0) {
            addTodo(inpDescription);
            onPress();
            setInpDescription("");
          }
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        testID={"close-button"}
        onPress={() => {
          onPress();
          setInpDescription("");
        }}
      >
        <Text style={styles.buttonText}>Close</Text>
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
