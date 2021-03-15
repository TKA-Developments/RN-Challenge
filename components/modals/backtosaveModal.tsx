import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Pressable, Alert } from "react-native";
import { Text, View, ScrollView } from "../Themed";

const backtosaveModal = ({ visible }: { visible: boolean }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.container}>
          <Text>Are u done?</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable>
              <Text>Yes</Text>
            </Pressable>
            <Pressable>
              <Text>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default backtosaveModal;
