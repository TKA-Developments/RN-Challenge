import { Text } from "@rneui/base";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { View } from "react-native";

type Props = {};

const Header = (props: Props) => {
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
        // backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "transparent",
        }}
      >
        <Text
          style={{ fontSize: 44, fontFamily: "Montserrat", fontWeight: "700" }}
        >
          Today
        </Text>
        <Icon name="calendar" size={20} color="#9c9b9b" />
      </View>
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 12,
          color: "#9c9b9b",
        }}
      >
        Tuesday, 18 June 2022
      </Text>
    </View>
  );
};

export default Header;
