import React,{useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {addMessage } from '../firebase/utils';

type Props = {
    setUp:() => void,
    user: {
        email:string
    }
}

const InputMessageBox = ({setUp,user}:Props) => {
    const [message,setMessage] = useState<string>()

    const sendMessage = () => {
        {if(message!=undefined && message!=""){
            addMessage(setUp,message,"textStore",user.email,"messages")
            setMessage("")
        }}
    }

    return(
        <View style={styles.container}>
            <View style={styles.textField}>
                <TextInput
                    value={message}
                    onChangeText={text => setMessage(text)}
                    placeholder='<Message>'
                    onEndEditing={sendMessage}
                    />
            </View>
            
        <Button
            title='>'
            onPress={sendMessage}
        />
        </View>
    )
}

export default InputMessageBox;

const styles = StyleSheet.create({
    container: {
        flex:.05,
        flexDirection:"row",
    },
    textField:{
        flex:1,
        justifyContent:"center",
        borderColor:"grey",
        borderWidth:1,
    }
  });
  