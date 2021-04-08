import React, { useState } from 'react';
import { Icon, Overlay } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextRegular, TextBold } from '../StyledText';
import { useColor } from '../Themed';
import CheckBox from './CheckBox';
import { getCategoryColor } from '../TaskComponents/TaskColor';

const OverlayFilter = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleOverlay}>
        <View
          style={{
            ...styles.filterIconWrapper,
            backgroundColor: useColor('background'),
          }}
        >
          <Icon
            iconStyle={styles.filterIcon}
            name="filter-outline"
            type="ionicon"
            color={useColor('textSecondary')}
          />
        </View>
      </TouchableOpacity>

      <Overlay
        overlayStyle={{
          ...styles.container,
          borderColor: useColor('shadeAbove'),
          backgroundColor: useColor('shadeBelow'),
        }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View>
          <TextBold style={styles.title}>Filter Option</TextBold>
          <CheckBox title={'Finished'} />
          <CheckBox title={'Not Finished'} />
          <CheckBox title={'Show Past'} />
          <TextBold style={styles.title}>Category</TextBold>
          <CheckBox title={'General'} checkColor={getCategoryColor('general')} />
          <CheckBox title={'School'} checkColor={getCategoryColor('school')} />
          <CheckBox title={'Hobby'} checkColor={getCategoryColor('hobby')} />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  filterIcon: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  filterIconWrapper: {
    padding: 7,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 10,
    borderWidth: 3,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
  },
});

export default OverlayFilter;
