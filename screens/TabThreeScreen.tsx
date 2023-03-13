import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { Alert, NativeBaseProvider, Input, Button, Stack, VStack, HStack, IconButton, CloseIcon } from "native-base";
import { useState } from 'react';
import { db } from '../configfirebase';
import { child, onValue, push, ref, set } from 'firebase/database';

export default function TabThreeScreen({navigation}: {navigation:any}) {
    const dbref = ref(db);
    var array: any[] = [];
    const [data, setData] = useState<any[]>([]);
    const [task, setTask] = useState('');
    const [value, setValue] = useState('');
    const [visibility, setVisibility] = useState(false);
    const key = push(child(ref(db),'task')).key;

    function search(searchstring: any){
        
        array = []

        onValue(child(dbref, 'task/'),(snapshot) => {
            if(snapshot.exists()){
                snapshot.forEach(childsnapshot => {
                    if((childsnapshot.val().search).includes(searchstring)){
                        array = [...array,childsnapshot.val()];
                    }
                })
            }
        })
    
        onValue(child(dbref, 'taskdone/'),(snapshot) => {
            if(snapshot.exists()){
                snapshot.forEach(childsnapshot => {
                    if((childsnapshot.val().search).includes(searchstring)){
                        array = [...array,childsnapshot.val()];
                    }
                })
            }
        })

        if(array.length==0){
            setVisibility(true)
            setData([]);
            setTimeout(function() {
                setVisibility(false)
            }, 3000);
        }else{
            setData(array);
        }

    }

    return (
        <NativeBaseProvider>
        <View style={styles.container}>
            <Stack space={3} w="100%" maxW="400" style={{marginBottom: visibility?20:0, opacity: visibility?100:0}}>
                <Alert w="100%" status="error" style={{width: 300, marginLeft: 50}}>
                    <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text>
                            data not found!
                        </Text>
                        </HStack>
                        <IconButton variant="unstyled" _focus={{
                        borderWidth: 0
                        }} icon={<CloseIcon size="3" />} _icon={{
                        color: "coolGray.600"
                        }} onPress={()=>{setVisibility(false)}}/>
                    </HStack>
                    </VStack>
                </Alert>
            </Stack>
            <Text style={styles.title}>Search Task</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Input variant="rounded" style={styles.input} placeholder="Search task here!" value={value} onChangeText={(e)=>{setTask(e), setValue(e)}}/>
            <Button size="sm" variant="subtle" style={styles.button} onPress={()=>{search(value), setValue('')}}>
                search
            </Button>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {data.map((e)=>
                <View key={e.key} style={styles.card}>
                    <Text style={styles.item}>{e.task}</Text>
                </View>
            )}
            </ScrollView>
        </View>
        </NativeBaseProvider>
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
    button:{
        marginTop: 20,
    },
    input:{
        textAlign: 'center',
        maxWidth: 300
    },
    item:{
        margin: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#002394',
        textAlign: 'center',
        flex: 1,
        maxWidth: 125
    },
    card:{
        margin: 10,
        padding: 10,
        width: 300,
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#b8dcff',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {width: 2, height: 2},
        backgroundColor: '#afeeee',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll:{
        maxHeight: 180,
    },
});
