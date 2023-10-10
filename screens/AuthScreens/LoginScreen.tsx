import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { signIn } from '../../firebase/utils';

import { auth } from '../../firebase';
import PasswordEntry from '../../components/PasswordEntry';

type Props = {
    toRegister:React.Dispatch<React.SetStateAction<boolean>>
}

const LoginScreen = ({toRegister}:Props) => {
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
                title='Sign In'
                color="orange"
                onPress={() => signIn(username,password)}
            />
            <Button
                title="Register"
                onPress={() => toRegister(true)}
                />
        </View>
    )

}

export default LoginScreen;