import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { 
  Text as DefaultText, 
  View as DefaultView, 
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultTouchableOpacity,
  Pressable, PressableProps, Animated,
  TouchableWithoutFeedback, Alert
  } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
// import { TodoLists } from '../types';
// import TodoList from './one/TodoLists';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type CustomButtonAdditionalProps = {
  pressedColor?: string;
}

type IcButtonProps = {
  iconRadius?: number,
  iconHeight?: number,
  iconWidth?: number,
  iconBackColor?: string,
  iconPadding?: number,
  iconMargin?: number,
}

type OtherIcBtnProps = {
  iconColor?: string;
  iconSize?: number;
}

type ToggleProps = {
  checked: boolean,
  checkedColor?: string,
  uncheckedColor?: string,
}

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'];
export type CustomButtonProps = ThemeProps & PressableProps & CustomButtonAdditionalProps;
export type IconButtonProps = TouchableOpacityProps & IcButtonProps;
export type OtherIcButtonProps = IconButtonProps & OtherIcBtnProps;
export type ToggleButtonProps = ThemeProps & TouchableWithoutFeedback['props'] & ToggleProps;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps){
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultTextInput style={[ { color }, style ]} {...otherProps} />;
}

export function TouchableOpacity(props: TouchableOpacityProps){
  return (
  <DefaultTouchableOpacity 
    activeOpacity = {0.5}
    onPress = { props.onPress }
    style = { props.style }>
      {props.children}
          </DefaultTouchableOpacity>)
}

export function CustomButton(props: CustomButtonProps){
  const fadeIn = React.useRef( new Animated.Value(1))

  return (
    <Pressable onPress = {props?.onPress}
               
              style = { props?.style } >
                
    </Pressable>
  )
}

export function ToggleButton(props: ToggleButtonProps){
  const { style, children, onPress, lightColor, darkColor, checked, checkedColor, uncheckedColor, ...allProps } = props
  
  return (
    <TouchableWithoutFeedback onPress={(e)=>{onPress? onPress(e) : null}} 
                              {...allProps} >
      <View style={[{ backgroundColor: checked ? checkedColor : (uncheckedColor == undefined ? checkedColor : uncheckedColor)}, style]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}

export function IconButton(props: IconButtonProps ){
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style} >
      <View
        style={{
          padding: props.iconPadding,
          margin: props.iconMargin,
          alignItems: 'center',
          justifyContent: 'center',
          width: props.iconWidth,
          height: props.iconHeight,
          borderRadius: props.iconRadius,
          backgroundColor: props.iconBackColor,
        }}
      >
        {props.children}
      </View>
    </TouchableOpacity >)
}

export function AddToListButton(props: OtherIcButtonProps){
  const {iconColor, iconSize, ...allProps} = props;
  return (
    <IconButton 
      {...allProps} >
      <Entypo 
            name='add-to-list'      
            color={iconColor}
            size={iconSize}
      />
    </IconButton >)
}

export function SaveButton(props: OtherIcButtonProps){
  const { iconColor, iconSize, ...allProps } = props;
  return (
    <IconButton
      {...allProps} >
        <AntDesign 
            name='check'
            color={iconColor}
            size={iconSize}
        />
      </IconButton>
  )
}
