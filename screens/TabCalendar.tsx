import { Pressable, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabCalendarScreen({navigation}: RootTabScreenProps<'TabCalendar'>) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Calendar</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabCalendarScreen.tsx" />
      <View>
        <Pressable onPress={()=>{navigation.navigate("TabAccount")}}>
          <Text style={tailwind("font-bold")}>Ke Halaman Tiga</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
