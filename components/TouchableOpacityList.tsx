import React from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

export type TouchableOpacitySingleData = {
  icon?: any,
  title: string,
  subtitle?: string,
  onPress?: () => void,
};
export type TouchableOpacitySectionData = {
  title: string,
  data: Array<TouchableOpacitySingleData>
};
export type TouchableOpacityData = { sections: Array<TouchableOpacitySectionData> }

const styles = (theme: Theme) => StyleSheet.create({
  sectionHeaderTextStyle: {
    color: theme.colors.text,
    fontWeight: 'bold',
    margin: 10,
  },
  sectionHeaderStyle: {
    backgroundColor: 'gray',
    flex: 1,
  },
  touchableStyle: {
    borderWidth: 1,
    flex: 1,
  },
});

const TouchableOpacitySingle = ({
  item,
  touchableStyle
}:
  { item: TouchableOpacitySingleData, touchableStyle: any }) => {
  return (
    <TouchableOpacity style={touchableStyle} onPress={item.onPress}>
      <View style={{
        flexDirection: 'row',
        marginHorizontal: 8,
        marginVertical: 12,
      }}>
        {item.icon ?? item.icon}
        <View style={{ justifyContent: 'center', }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 15,
          }}>{item.title}</Text>
          {item.subtitle ? <Text>{item.subtitle}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TouchableOpacityListSectionHeader = ({
  title,
  containerStyle,
  textStyle
}:
  { title: string, containerStyle: any, textStyle: any }) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

export default ({ sections }: TouchableOpacityData) => {
  const theme = useTheme();
  const themedStyles = styles(theme);

  return (
    <View>
      <SectionList<TouchableOpacitySingleData, TouchableOpacitySectionData>
        sections={sections}
        keyExtractor={(item, index) => item.title}
        renderSectionHeader={(section) =>
          <TouchableOpacityListSectionHeader
            title={section.section.title}
            textStyle={themedStyles.sectionHeaderTextStyle}
            containerStyle={themedStyles.sectionHeaderStyle}
          />}
        renderItem={({ item }) =>
          <TouchableOpacitySingle
            item={item}
            touchableStyle={themedStyles.touchableStyle}/>}
      />
    </View>
  );
}
