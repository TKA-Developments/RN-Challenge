import { Button } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { blueColor } from "../constants/Colors";

type Props = {
  name: string;
  isSelected: boolean;
  filterFunction: any;
};

const FilterButton = (props: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={props.name}
        buttonStyle={{
          ...styles.button,
          backgroundColor: props.isSelected
            ? blueColor.semitransparent
            : "transparent",
        }}
        titleStyle={{
          ...styles.buttonTitle,
          color: props.isSelected ? blueColor.normal : "#333333",
        }}
        containerStyle={{ borderRadius: 20 }}
        onPress={props.filterFunction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { flex: 1, marginHorizontal: 10 },
  button: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  buttonTitle: {
    textTransform: "capitalize",
  },
});

export default FilterButton;
