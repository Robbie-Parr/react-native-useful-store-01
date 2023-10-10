import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { auth } from './firebase';

import AuthLandingScreen from './screens/AuthScreens/AuthLandingScreen';
import LandingScreen from './screens/LandingScreen';

export default function App() {
  const [user,setUser] = useState<any>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser){
            
            console.log(auth.currentUser)
            setUser(auth.currentUser)
        }else{
          setUser(null)
        }
    })
    return(unsubscribe)
},[])

  return (
    <View style={styles.container}>
      {user ? <LandingScreen/> : <AuthLandingScreen/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginLeft:10,
    marginRight:10
  },
});
