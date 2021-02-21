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
  editTodo: (inp: string, index: number) => void,
  editIndex: number,
};

export default function EditModal({
  onPress,
  inpDescription,
  setInpDescription,
  editTodo,
  editIndex,
}: Props) {
  return (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Edit description:</Text>
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
            editTodo(inpDescription, editIndex);
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

// const DefaultModalContent: React.FC<Props> = (props) => (
//   <View style={styles.content}>
//     <Text style={styles.contentTitle}>Hi 👋!</Text>
//     <Button testID={"close-button"} onPress={props.onPress} title="Close" />
//   </View>
// );

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
