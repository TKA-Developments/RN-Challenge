import { useFonts } from "expo-font";
import * as React from "react";

import { Text, TextProps } from "./Themed";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";
// import AppLoading from "expo-app-loading";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Poppins" }]} />;
}
