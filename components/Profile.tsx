import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";
import { Image } from "react-native";

export default function Profile() {
  return (
    <View>
      <Image
        source={{
          uri:
            "https://images.all-free-download.com/images/graphiclarge/cat_profile_196806.jpg",
        }}
        width={50}
        height={50}
      />
    </View>
  );
}
