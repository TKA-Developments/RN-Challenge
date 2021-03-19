import React, { ReactChild, ReactChildren } from 'react';
import { SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Text, ThemedColors, useThemeColors, View,
} from './Themed';

export type MenuListItemData = {
  additionalComponentLeft?: ReactChild | ReactChildren,
  additionalComponentRight?: ReactChild | ReactChildren,
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
    alignSelf: 'stretch',
  },
  sectionHeaderStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.inactive,
  },
  touchableStyle: {
    // borderWidth: 1,
    paddingVertical: 5,
    marginVertical: 5,
    minHeight: 55,
    justifyContent: 'center',
    // paddingLeft: 20,
    flex: 1,
  },
});

const MenuListItem = ({
  item,
  touchableStyle,
}:
  { item: MenuListItemData, touchableStyle: any }) => (
    <TouchableOpacity
      style={touchableStyle}
      onPress={item.onPress}
      activeOpacity={item.onPress ? 0.2 : 1}
    >
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          marginHorizontal: 8,
        // marginVertical: 12,
        // borderWidth: 1,
        }}
      >
        {item.additionalComponentLeft ? (
          <View style={{
            justifyContent: 'center',
          // borderWidth: 1,
          }}
          >
            {item.additionalComponentLeft}
          </View>
        ) : null}
        <View
          style={{
          // flexWrap: 'wrap',
            flexShrink: 1,
            paddingLeft: 10,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              // textAlign: 'left',
              fontSize: 15,
            // flexWrap: 'wrap',
            // borderWidth: 1,
            }}
          >
            {item.title}
          </Text>
          {item.subtitle
            ? (
              <Text
                style={{
                // textAlignVertical: 'center',
                // textAlign: 'left',
                // flexWrap: 'wrap',
                // // flex: 1,
                // borderWidth: 1,
                }}
              >
                {item.subtitle}
              </Text>
            )
            : null}
        </View>
        {item.additionalComponentRight ? (
          <View style={{
            justifyContent: 'center',
          // borderWidth: 1,
          }}
          >
            {item.additionalComponentRight}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
);

const MenuListSectionHeader = ({
  title,
  containerStyle,
  textStyle,
}:
  { title: string, containerStyle: any, textStyle: any }) => (
    <View style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
);

export default ({ sections }: TouchableOpacityData) => {
  const colors = useThemeColors();
  const themedStyles = styles(colors);

  return (
    <View style={{ flex: 1 }}>
      <SectionList<MenuListItemData, MenuListSectionData>
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={(section) => (
          <MenuListSectionHeader
            title={section.section.title}
            textStyle={themedStyles.sectionHeaderTextStyle}
            containerStyle={themedStyles.sectionHeaderStyle}
          />
        )}
        renderItem={({ item }) => (
          <MenuListItem
            item={item}
            touchableStyle={themedStyles.touchableStyle}
          />
        )}
      />
    </View>
  );
};
