import { Text, Modal, SafeAreaView, Animated, Easing } from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const FilterTodosMenu = () => {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const filterOpt = [
    {
      title: "All",
      action: console.log("all"),
    },
    {
      title: "Completed",
      action: console.log("comp"),
    },
    {
      title: "Incomplete",
      action: console.log("in"),
    },
  ];

  // animation
  function resizeBox(to: any) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }

  return (
    <>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => resizeBox(1)}
      >
        <MaterialCommunityIcons
          name="filter-variant"
          size={32}
          color="darkslategrey"
        />
      </TouchableOpacity>
      <Modal visible={visible}>
        <SafeAreaView
          style={styles.menuContainer}
          onTouchStart={() => setVisible(false)}
        >
          <Animated.View style={styles.menuPopup}>
            {filterOpt.map((opt, i) => (
              <TouchableOpacity
                style={[
                  styles.optContainer,
                  { borderBottomWidth: i === filterOpt.length - 1 ? 0 : 1 },
                ]}
                key={i}
                onPress={() => opt.action}
              >
                <Text style={styles.optText}>{opt.title}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default FilterTodosMenu;
