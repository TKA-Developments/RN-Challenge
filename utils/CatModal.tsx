import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

type Props = {
  onPress: () => any;
  imgUrl: string;
  imgIsLoading: boolean;
  setImgIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isCatModalVisible: boolean;
};

export default function CatModal({
  onPress,
  imgUrl,
  imgIsLoading,
  setImgIsLoading,
  isCatModalVisible,
}: Props) {
  console.log(imgUrl);
  return (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>🐱 CATS 🐈</Text>
      {isCatModalVisible && (
        <Image
          source={{ uri: imgUrl }}
          style={{ height: 250, width: 250, borderRadius: 10 }}
          onLoadStart={() => setImgIsLoading(true)}
          onLoadEnd={() => setImgIsLoading(false)}
        />
      )}
      <View style={styles.loadingContainer}>
        {imgIsLoading && (
          <Text style={styles.loadingText}>loading next image...</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        testID={"close-button"}
        onPress={() => {
          onPress();
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
  loadingContainer: {
    padding: 10,
    height: 50,
  },
  loadingText: {
    fontSize: 15,
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
});
