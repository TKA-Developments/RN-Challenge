import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { ThemedColors, useThemeColors } from '../components/Themed';
import Button from '../components/Button';

const styles = (colors: ThemedColors) => StyleSheet.create({
  textStyle: {
    marginBottom: 20,
    color: colors.text,
  },
  textCopyRightStyle: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.text,
  },
  buttonStyle: {
    color: colors.primary,
  },
  containerStyle: {
    flex: 1,
    margin: 20,
  },
});

export default () => {
  const themeColors = useThemeColors();
  const themedStyle = styles(themeColors);

  return (
    <View style={themedStyle.containerStyle}>
      <Text style={themedStyle.textStyle}>
        But I must explain to you how all this mistaken idea of denouncing
        pleasure and praising pain was born and I will give you a complete
        account of the system, and expound the actual teachings of the
        great explorer of the truth, the master-builder of human happiness.
        No one rejects, dislikes, or avoids pleasure itself, because it is
        pleasure, but because those who do not know how to pursue pleasure
        rationally encounter consequences that are extremely painful. Nor
        again is there anyone who loves or pursues or desires to obtain
        pain of itself, because it is pain, but because occasionally
        circumstances occur in which toil and pain can procure him some
        great pleasure. To take a trivial example, which of us ever
        undertakes laborious physical exercise, except to obtain some
        advantage from it? But who has any right to find fault with a man
        who chooses to enjoy a pleasure that has no annoying consequences,
        or one who avoids a pain that produces no resultant pleasure?
      </Text>
      <Button
        style={themedStyle.buttonStyle}
        onPress={() => Linking.openURL('mailto:andra.antariksa@gmail.com')}
      >
        Contact Me
      </Button>

      <Text style={themedStyle.textCopyRightStyle}>
        &copy; 2021 Andra Antariksa
      </Text>

    </View>
  );
}
