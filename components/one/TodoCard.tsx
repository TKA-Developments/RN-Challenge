import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../Themed';
import { StyleSheet } from 'react-native';

export default function TodoCard({label}:{label:string}){
    return(
        <View style={[styles.container, { backgroundColor: '#01579B' }]}
            >
            <Text style={styles.textStyle}>{label}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {        
        opacity: 0.8,
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,    
        height: 80,
    },
    textStyle: {
        flex: 1,
        fontSize:18,
    }

})