import React from "react";
import { Animated, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

import {
  RectButton,
  PanGestureHandler,
  State,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { MaterialIcons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { removeData } from "../redux/todoslice";

export default function AnimationSlide(props) {
  const dragX = new Animated.Value(0);
  let width = 0;
  const RATIO = 3;
  const transX = dragX.interpolate({
    inputRange: [0, RATIO],
    outputRange: [0, 1],
  });

  const reset = () => {
    Animated.spring(dragX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 15,
      friction: 5,
    }).start();
  };

  const onGestureEvent = () => {
    Animated.event([{ nativeEvent: { translationX: dragX } }], {
      useNativeDriver: true,
    });
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const dragToss = 0.05;
      const endOffsetX =
        event.nativeEvent.translationX + dragToss * event.nativeEvent.velocityX;

      let toValue = 0;
      if (endOffsetX < -width / 2) {
        toValue = -(width + 150) * RATIO;
      }

      Animated.spring(dragX, {
        velocity: event.nativeEvent.velocityX,
        tension: 15,
        friction: 5,
        toValue,
        useNativeDriver: true,
      }).start();
    }
  };

  const onLayout = (event) => {
    width = event.nativeEvent.layout.width;
  };
  const showRightAction = dragX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 0, 0],
  });

  const dispatch = useDispatch();

  return (
    <View>
      <Animated.View style={[styles.rowAction, { opacity: showRightAction }]}>
        <RectButton
          style={[styles.rowAction, styles.rightAction]}
          rippleColor={"transparent"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 100,
              paddingRight: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.toggleEdit(props.id, props.task, true);
                reset();
              }}
            >
              <MaterialIcons name="edit" size={24} color="#da7959" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(removeData(props.id));
                // reset();
              }}
            >
              <MaterialIcons name="delete" size={24} color="#A62700" />
            </TouchableOpacity>
          </View>
        </RectButton>
      </Animated.View>
      <PanGestureHandler
        activeOffsetX={[-10, 10]}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={{
            backgroundColor: "transparent",
            transform: [{ translateX: transX }],
          }}
          onLayout={onLayout}
        >
          {props.children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rectButton: {
    flex: 1,
    height: 60,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  rowAction: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  rightAction: {
    backgroundColor: "transparent",
    marginTop: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
  },
});
