import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Alert, NativeBaseProvider, Input, Button, Stack, VStack, HStack, IconButton, CloseIcon } from "native-base";
import { useState } from 'react';
import { db } from '../configfirebase';
import { ref, set, update } from 'firebase/database';

export default function editScreen({ navigation, route }: any) {
    const [visibility, setVisibility] = useState(false);
    const [task, setTask] = useState('');
    const [value, setValue] = useState('');
    const key = route.params.key;

    const submit = () => {
        update(ref(db,'task/'+key),{
          task: task,
          key: key
        }).then(() => {
          setVisibility(true)
          setTimeout(function() {
            setVisibility(false)
          }, 3000);
        })
        navigation.navigate('TabOneScreen');
    }

    return(
        <>
            <NativeBaseProvider>
                <View style={styles.container}>
                    <Stack space={3} w="100%" maxW="400" style={{marginBottom: visibility?100:0, opacity: visibility?100:0}}>
                    <Alert w="100%" status="success" style={{width: 300, marginLeft: 50}}>
                        <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} justifyContent="space-between">
                            <HStack space={2} flexShrink={1}>
                            <Alert.Icon mt="1" />
                            <Text>
                                data edited successfully!
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
                    <Image
                        source={require('../assets/images/favicon.png')}
                        style={{ width: 40, height: 40, borderRadius: 40/2}} />
                    <Text style={styles.title}>Edit Task</Text>
                    <View style={styles.separator} />
                    <Input variant="rounded" style={styles.input} placeholder="Edit your task here!" value={value} onChangeText={(e)=>{setTask(e), setValue(e)}}/>
                    <Button size="sm" variant="subtle" style={styles.button} onPress={()=>{submit(), setValue('')}}>
                        edit
                    </Button>
                </View>
            </NativeBaseProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
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
    }
});