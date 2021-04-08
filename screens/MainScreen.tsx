import React, { useEffect } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import { ITimeCategory } from '../components/TaskComponents/type';
import useTaskContext from '../hooks/useTasksContext';

const MainScreen = ({}: StackScreenProps<RootStackParamList, 'Main'>) => {
  console.log('AAA');
  const { timeBasedTasks, loading, allTasks, setLoading } = useTaskContext();

  const aaa = () => {
    setLoading(!loading);
    console.log(timeBasedTasks);
  };

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
        {loading ? (
          <TextBold>asdasd</TextBold>
        ) : (
          timeBasedTasks.map((item, index) => {
            return <TimeCategory key={index} title={item.title} tasks={item.tasks} />;
          })
        )}
      </ScrollView>
      <TouchableOpacity onPress={() => aaa()} style={styles.plusButton}>
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
