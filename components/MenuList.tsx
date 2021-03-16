import React from 'react';
import { SectionList, StyleSheet, TouchableOpacity, } from 'react-native';
import { Text, ThemedColors, useThemeColors, View } from './Themed';

export type MenuListItemData = {
  icon?: any,
  title: string,
  subtitle?: string,
  onPress?: () => void,
};
export type MenuListSectionData = {
  title: string,
  data: Array<MenuListItemData>
};
export type TouchableOpacityData = { sections: Array<MenuListSectionData> }

const styles = (colors: ThemedColors) => StyleSheet.create({
  sectionHeaderTextStyle: {
    fontWeight: 'bold',
    margin: 10,
    color: colors.inactive,
  },
  sectionHeaderStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.inactive,
  },
  touchableStyle: {
    // borderWidth: 1,
    // paddingLeft: 20,
    flex: 1,
  },
});

const MenuListItem = ({
  item,
  touchableStyle,
}:
  { item: MenuListItemData, touchableStyle: any }) => {
  return (
    <TouchableOpacity
      style={touchableStyle}
      onPress={item.onPress}
      activeOpacity={item.onPress ? 0.2 : 1}
    >
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 8,
          marginVertical: 12,
        }}
      >
        {item.icon ?? item.icon}
        <View style={{ justifyContent: 'center', }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
            }}
          >
            {item.title}
          </Text>
          {item.subtitle ?
            <Text>{item.subtitle}</Text> :
            null
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MenuListSectionHeader = ({
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
  const colors = useThemeColors();
  const themedStyles = styles(colors);

  return (
    <View>
      <SectionList<MenuListItemData, MenuListSectionData>
        sections={sections}
        keyExtractor={(item, index) => item.title}
        renderSectionHeader={(section) =>
          <MenuListSectionHeader
            title={section.section.title}
            textStyle={themedStyles.sectionHeaderTextStyle}
            containerStyle={themedStyles.sectionHeaderStyle}
          />}
        renderItem={({ item }) =>
          <MenuListItem
            item={item}
            touchableStyle={themedStyles.touchableStyle}/>}
      />
    </View>
  );
}
