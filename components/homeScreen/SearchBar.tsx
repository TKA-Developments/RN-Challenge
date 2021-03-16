import React, { useContext, useState } from 'react';
import { View, Text, TextSemiBold } from '../Themed';
import { SearchBar, Overlay } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { TodoContext } from '../../contexts/TodoContext';
import Colors from '../../constants/Colors';

const SearchBarComp = () => {
    const colorScheme = useColorScheme();
    const {
        search,
        categories,
        updateSearch,
        updateStatus,
        updateCategory,
        category,
        todoStatus,
        showOverdue,
        toggleOverdue,
    } = useContext(TodoContext);
    const [visible, setVisible] = useState<boolean>(false);
    const [pressed, setPressed] = useState<string>('');

    const toggleOverlay = () => {
        setVisible(!visible);
    }

    const onStatusPress = (newStatus: string) => {
        if (todoStatus !== newStatus) {
            updateStatus(newStatus);
        }
        setPressed('');
        setVisible(false);
    }
    const onCategoryPress = (newCategory: string) => {
        if (category !== newCategory) {
            updateCategory(newCategory);
        }
        setPressed('');
        setVisible(false);
    }

    const onOverduePress = () => {
        toggleOverdue();
        setVisible(false);
        setPressed('');
    }

    const lineStyle = {
        height: 0.5,
        flex: 1,
        backgroundColor: Colors[colorScheme].textDarkest,
    }

    return (
        <View style={styles.container}>
            <SearchBar
                platform='android'
                placeholder='Search Todo...'
                containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors[colorScheme].background,
                    padding: 0,
                    width: '90%',
                }}
                inputContainerStyle={{
                    height: 40,
                    backgroundColor: Colors[colorScheme].background,
                    borderBottomWidth: 1,
                    borderColor: Colors[colorScheme].textDarkest,
                }}
                inputStyle={{
                    color: Colors[colorScheme].text
                }}
                leftIconContainerStyle={{
                    marginRight: -20,
                    marginLeft: 5,
                }}
                searchIcon={{
                    color: Colors[colorScheme].text
                }}
                cancelIcon={{
                    color: Colors[colorScheme].text
                }}
                onChangeText={updateSearch}
                value={search}
            />
            <TouchableOpacity style={styles.filterContainer} onPress={toggleOverlay}>
                <AntDesign name='filter' size={28} color={Colors[colorScheme].text} />
            </TouchableOpacity>
            <Overlay overlayStyle={{
                backgroundColor: Colors[colorScheme].background,
                ...styles.overlayContainer
            }} isVisible={visible} onBackdropPress={toggleOverlay}>
                <View>
                    <View style={styles.overlayHeaderContainer}>
                        <TextSemiBold style={styles.overlayHeaderText}>Todo Status</TextSemiBold>
                        <View style={{ ...lineStyle }} />
                    </View>

                    <View style={styles.filterItemsContainer}>
                        {['All', 'Complete', 'Incomplete'].map(item => (
                            <FilterItem
                                key={item}
                                title={item}
                                onPress={() => onStatusPress(item)}
                                onShowUnderlay={() => setPressed(item)}
                                onHideUnderlay={() => setPressed('')}
                                containerConditional={todoStatus === item}
                                textConditional={pressed === item || todoStatus === item}
                            />
                        ))}
                    </View>
                </View>
                <View>
                    <View style={styles.overlayHeaderContainer}>
                        <TextSemiBold style={styles.overlayHeaderText}>Todo Category</TextSemiBold>
                        <View style={{ ...lineStyle }} />
                    </View>

                    <View style={styles.filterItemsContainer}>
                        {categories.map(item => (
                            <FilterItem
                                key={item.title}
                                title={item.title}
                                onPress={() => onCategoryPress(item.title)}
                                onShowUnderlay={() => setPressed(item.title)}
                                onHideUnderlay={() => setPressed('')}
                                containerConditional={category === item.title}
                                textConditional={pressed === item.title || category === item.title}
                                categoryColor={item.color}
                            />
                        ))}
                        <FilterItem
                            title='All'
                            onPress={() => onCategoryPress('All')}
                            onShowUnderlay={() => setPressed('AllCategory')}
                            onHideUnderlay={() => setPressed('')}
                            containerConditional={category === 'All'}
                            textConditional={pressed === 'AllCategory' || category === 'All'}
                        />
                        <FilterItem
                            title="+ Add Category"
                            onPress={() => console.log('Add Category')}
                            onShowUnderlay={() => setPressed('+')}
                            onHideUnderlay={() => setPressed('')}
                            containerConditional={category === '+'}
                            textConditional={pressed === '+' || category === '+'}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.overlayHeaderContainer}>
                        <TextSemiBold style={styles.overlayHeaderText}>Options</TextSemiBold>
                        <View style={{ ...lineStyle }} />
                    </View>
                    <View style={styles.filterItemsContainer}>
                        <FilterItem
                            title="Show Overdue"
                            onPress={() => onOverduePress()}
                            onShowUnderlay={() => setPressed('overdue')}
                            onHideUnderlay={() => setPressed('')}
                            containerConditional={showOverdue}
                            textConditional={pressed === 'overdue' || showOverdue}
                        />
                    </View>

                </View>
            </Overlay>
        </View>
    );
}

interface IFilterItem {
    title: string,
    onPress: () => void,
    onShowUnderlay: () => void,
    onHideUnderlay: () => void,
    containerConditional: boolean,
    textConditional: boolean,
    categoryColor?: string
}

const FilterItem = (props: IFilterItem) => {
    const colorScheme = useColorScheme();

    return (
        <TouchableHighlight style={{
            ...styles.itemContainer,
            borderColor: props.categoryColor ? props.categoryColor : Colors[colorScheme].textDarken,
            backgroundColor: props.containerConditional ? (props.categoryColor ? props.categoryColor : Colors[colorScheme].textDarken) : '',
        }}
            underlayColor={props.categoryColor ? props.categoryColor : Colors[colorScheme].textDarken}
            onPress={props.onPress}
            onLongPress={props.onPress}
            onShowUnderlay={props.onShowUnderlay}
            onHideUnderlay={props.onHideUnderlay}
        >
            <Text style={{
                color: props.textConditional ? Colors[colorScheme].background : (props.categoryColor ? props.categoryColor : Colors[colorScheme].text)
            }}>{props.title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterContainer: {

    },
    overlayContainer: {
        padding: 20,
        width: '80%'
    },
    overlayHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    overlayHeaderText: {
        fontSize: 18,
        paddingRight: 7.5,
    },
    filterItemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemContainer: {
        borderWidth: 1,
        borderRadius: 12.5,
        paddingVertical: 2.5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 10,
    }
})

export default SearchBarComp;