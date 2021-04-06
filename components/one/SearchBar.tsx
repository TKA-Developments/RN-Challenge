import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from '../Themed';
import { StyleSheet } from 'react-native';

export default function SearchBar(){
    return(
        <View style={styles.container}
            darkColor="#424242"
            lightColor="#F5F5F5"
            >
            <Ionicons   name='search-sharp' 
                        size={24}
                        style={styles.iconStyle}                         
                        />
            <TextInput  style={styles.textInputStyle}
                        placeholder='Search'
                        defaultValue='' 
                        />
        </View>
    );
}

function handleChange({ input }: { input: string }){

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems:'center',        
    },
    iconStyle:{
        marginLeft: 2,
        marginRight: 5,
    },
    textInputStyle:{
        flex: 1,
        marginHorizontal: 5
    }

})