import React,{useState,useEffect} from 'react';
import { auth } from './index';
import { request } from './utils';


const useFirebase = () => {
    const [user,setUser] = useState<any>()
    const [data,setData] = useState<{id:string,message:string}[]>([])

    const setUp = () => {
        setUser(auth.currentUser)
        if(auth.currentUser?.email){
        request("textStore",auth.currentUser?.email,"messages")
            .then((response:any) => {
                console.log(response)
                setData(
                    response.map((value:{id:string,data:{message:string}}) =>
                      ({id:value.id,message:value.data.message})
                    )
                )
            })
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                
                console.log(auth.currentUser)
                setUp()
                console.log(user)
            }
        })
        return(unsubscribe)
    },[])

    return {user,data,setUp};
}

export default useFirebase;