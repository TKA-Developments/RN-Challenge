import * as React from 'react';

import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function TextBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito-bold' }]} />;
}

export function TextExtraBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito-extrabold' }]} />;
}

export function TextExtraLight(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunitp-extralight' }]} />;
}

export function TextLight(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito-light' }]} />;
}

export function TextSemiBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito-semibold' }]} />;
}

export function TextRegular(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito' }]} />;
}
