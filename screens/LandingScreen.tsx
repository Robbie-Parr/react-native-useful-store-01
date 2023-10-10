import React,{useState} from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { signOut} from '../firebase/utils';
import useFirebase from '../firebase/useFirebase';
import InputMessageBox from '../components/InputMessageBox';

const LandingScreen = () => {
    const {user,data,setUp} = useFirebase()

    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Button 
                    title="Log Out"
                    onPress={signOut}
                />
                {user && <Text>Hello {user.email}</Text>}
            </View>
            
            {user && <>
                <ScrollView style={styles.messagesView}>
                    {data.map((value:{id:string,message:string}) => 
                    <View key={value.id} style={styles.textContainer}>
                        <Text style={styles.text}>{value.message}</Text>
                        <Text style={styles.textPad}/>
                    </View>
                    )}
                </ScrollView>
                <InputMessageBox setUp={setUp} user={user}/>
            </>}
        </View>
    )

}

export default LandingScreen;

const styles = StyleSheet.create({
    container: {
        width:390,
        height:700,
        margin:0,
        paddingTop:10,
        overflowY:"hidden",
        paddingBottom:100
    },
    topBar:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"whitesmoke",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:10,
        
    },
    messagesView:{
        backgroundColor:"lightgrey",
        paddingLeft:1,
        paddingTop:1,
        overflowY:"scroll",
        flex:.95,
    },
    textContainer:{
        flexDirection:'row',
        
        margin:5,
        paddingLeft:2,
        
    },
    textPad:{
        flex:1,
    },
    text:{
        minHeight:20,
        backgroundColor:"#fff",
        padding:5,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
    }
  });
  