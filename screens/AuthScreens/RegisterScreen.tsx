import React,{useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { createUser } from '../../firebase/utils';
import PasswordEntry from '../../components/PasswordEntry';

const RegisterScreen = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    return(
        <View>
            <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                placeholder='Username'
                />
            <PasswordEntry
                password={password}
                setPassword={setPassword}/>
            <Button
                title='Register'
                color="green"
                onPress={() => {
                    createUser(username,password)
                }}
            />
        </View>
    )

}

export default RegisterScreen;