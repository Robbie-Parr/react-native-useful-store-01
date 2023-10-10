import React, {useState} from 'react';
import {TextInput} from 'react-native';

type Props = {
    password:string,
    setPassword:React.Dispatch<React.SetStateAction<string>>
}

const PasswordEntry = ({password,setPassword}:Props) => {
    

    const addPassword = (text:string) => {
        if(text.endsWith('*')){
            setPassword(password.slice(0,password.length-2))
        }else if(text.length==0) {
            setPassword("")
        }else{
            setPassword(password+(text.replaceAll('*','')))
        }
    }

    return(
        <TextInput
                value={ "*".repeat(password.length)}
                onChangeText={text => addPassword(text)}
                placeholder='Password'
        />
    )

}

export default PasswordEntry;