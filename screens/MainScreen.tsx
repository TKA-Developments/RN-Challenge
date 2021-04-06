import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { getGradientColor } from '../components/Themed';
import { TextRegular, TextBold, TextExtraBold } from '../components/StyledText';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../components/SearchBar';
import { Icon } from 'react-native-elements';
import { useColor } from '../components/Themed';
import TimeCategory from '../components/TaskComponents/TimeCategory';
import Task from '../components/TaskComponents/Task';
import { ScrollView } from 'react-native-gesture-handler';
import { ITimeCategory } from '../components/TaskComponents/type';

const MainScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Main'>) => {
  return (
    <LinearGradient style={styles.container} colors={getGradientColor()}>
      <TextExtraBold style={styles.titleText}>Fauzan's TODOS</TextExtraBold>
      <View style={styles.searchBarContainer}>
        <SearchBar />
        <TouchableOpacity>
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
      </View>
      <ScrollView>
        <TimeCategory title={data.title} tasks={data.tasks} />
        <TimeCategory title={data.title} tasks={data.tasks} />
        <TimeCategory title={data.title} tasks={data.tasks} />
      </ScrollView>
      <TouchableOpacity style={styles.plusButton}>
        <View
          style={{
            ...styles.plusIconWrapper,
            backgroundColor: useColor('backgroundSecondary'),
          }}
        >
          <Icon
            iconStyle={styles.plusIcon}
            name="add-outline"
            type="ionicon"
            color={useColor('text')}
          />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const data: ITimeCategory = {
  title: 'Today',
  tasks: [
    {
      id: '1',
      name: 'Muhammad',
      done: false,
      date: '23 Maret 2021',
      category: 'hobby',
    },
    {
      id: '2',
      name: 'Fauzan',
      done: false,
      date: '26 Maret 2021',
      category: 'school',
    },
    {
      id: '3',
      name: 'Al-Ghifari',
      done: false,
      date: '29 Maret 2021',
      category: 'general',
    },
  ],
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    paddingBottom: 20,
    height: '100%',
  },
  titleText: {
    fontSize: 30,
    marginBottom: 5,
  },
  plusIcon: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  filterIcon: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  plusIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconWrapper: {
    padding: 7,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MainScreen;
