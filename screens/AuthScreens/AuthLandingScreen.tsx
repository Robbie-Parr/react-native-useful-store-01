import React,{useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { signIn } from '../../firebase/utils';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';

const AuthLandingScreen = () => {
    const [needsToRegister,setNeedsToRegister] = useState(false)

    return(
        <View>
            {needsToRegister ? 
            <RegisterScreen/>:
            <LoginScreen toRegister={setNeedsToRegister}/>}
        </View>
    )

}

export default AuthLandingScreen