import React, { useContext, useState } from 'react';
import { View, Text } from '../Themed';
import { SearchBar, Overlay } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { TodoContext } from '../../contexts/TodoContext';

const SearchBarComp = () => {
    const colorScheme = useColorScheme();
    const { search, categories, updateSearch, updateStatus, updateCategory } = useContext(TodoContext);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    }

    const onStatusPress = (newStatus: string) => {
        updateStatus(newStatus);
        setVisible(false);
    }
    const onCategoryPress = (newCategory: string) => {
        updateCategory(newCategory);
        setVisible(false);
    }

    return (
        <View style={styles.container}>
            <SearchBar
                platform='default'
                placeholder='Search Todo...'
                containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
                    padding: 0,
                    width: '90%'
                }}
                inputContainerStyle={{
                    borderRadius: 50,
                    height: 40,
                }}
                onChangeText={updateSearch}
                value={search}
            />
            <TouchableOpacity style={styles.filterContainer} onPress={toggleOverlay}>
                <AntDesign name='filter' size={28} color={colorScheme == 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
            <Overlay overlayStyle={{ backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }} isVisible={visible} onBackdropPress={toggleOverlay}>
                <View>
                    <Text>Todo Status</Text>
                    {['All', 'Complete', 'Incomplete'].map(item => (
                        <TouchableOpacity key={item} onPress={() => onStatusPress(item)} >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View>
                    <Text>Todo Category</Text>
                    {categories.map(item => (
                        <TouchableOpacity key={item.title} onPress={() => onCategoryPress(item.title)} >
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Overlay>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterContainer: {

    }
})

export default SearchBarComp;