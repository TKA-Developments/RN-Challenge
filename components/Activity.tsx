import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
export function Activity(props: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [textEdit, setTextEdit] = useState("");
  const handlerEdit = () => {
    setModalVisible(!modalVisible);
  };

  if (props.types === "process") {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleHeader}>Update Activity</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => props.updateState(text)}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={props.updateFunc}
                >
                  <Text style={styles.textStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Text style={styles.titleActivity}>{props.children}</Text>
        <View style={styles.icons}>
          <AntDesign
            name="checkcircle"
            size={24}
            color="#fff"
            onPress={props.checkFunc}
          />
          <AntDesign
            name="edit"
            size={24}
            color="#fff"
            onPress={() => handlerEdit()}
          />
          <Entypo
            name="circle-with-cross"
            size={24}
            color="#fff"
            onPress={props.deleteFunc}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container2}>
        <Text
          style={{
            flex: 1,
            marginLeft: 30,
            fontSize: 20,
            fontWeight: "bold",
            flexGrow: 2.5,
            color: "#fff",
          }}
        >
          {props.children}
        </Text>
        <View style={styles.icons}>
          <AntDesign name="checkcircle" size={24} color="#fff" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    alignContent: "center",
    backgroundColor: "#cf1f2d",
    height: 80,
    marginBottom: 5,
  },
  titleHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 14,
    paddingLeft: 20,
    marginBottom: 10,
    borderColor: "black",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "green",
    height: 80,
    marginBottom: 5,
  },
  icons: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  titleActivity: {
    flex: 1,
    marginLeft: 30,
    fontSize: 20,
    fontWeight: "bold",
    flexGrow: 2.5,
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
