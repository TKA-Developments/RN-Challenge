import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RenderItemTV } from '../components/RenderItem';
import { Access } from '../config/Access'

export default function TabTwoScreen() {
  const [isLoading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  const getData = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${encodeURIComponent(Access.token)}`)
      const json = await response.json()
      setData(json.results)
    } 
    catch (error) {
      console.error(error)
    } 
    finally {
      setLoading(false)
    }
  };
  React.useEffect(() => {
    getData()
  }, [])
  return (
    <View style={styles.container}>
      {isLoading ? 
        <ActivityIndicator /> 
      : 
        <FlatList style={{width: '100%'}}
          data={data}
          renderItem={RenderItemTV}
          keyExtractor={item => item.id.toString()}
        />
      }
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
