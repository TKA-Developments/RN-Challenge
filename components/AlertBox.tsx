import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ColorState, Text, ThemeProps, View, } from './Themed';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
  },
  closeButtonStyle: {
    alignItems: 'flex-end',
  },
  messageStyle: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default (
  props: ThemeProps &
    Readonly<ViewProps> &
    { colorState?: ColorState }
    & { message: string, setMessage?: React.Dispatch<React.SetStateAction<string | null>> },
) => {
  const {
    style,
    colorState,
    message,
    setMessage,
  } = props;
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isClosed && setMessage !== undefined) {
      setMessage(null);
    }
  }, [isClosed]);

  if (isClosed) {
    return <></>;
  }

  return (
    <View style={[styles.containerStyle, style]} colorState={colorState ?? 'danger'}>
      {
        setMessage !== undefined
          ? (
            <TouchableOpacity
              onPress={() => setIsClosed(!isClosed)}
              style={styles.closeButtonStyle}
            >
              <AntDesign name="closecircle" size={30}/>
            </TouchableOpacity>
          )
          : null
      }
      <Text style={styles.messageStyle}>
        {message}
      </Text>
    </View>
  );
};
