import firebase from "firebase/compat/app";
import {db,auth} from "./index"
import { collection, doc, getDoc } from "firebase/firestore";
//import fs from "fs";

const signIn = (username:string,password:string) => {
    auth.signInWithEmailAndPassword(username,password)
        .catch(error => error.message)
}

const signOut = async () => {
    return auth.signOut()
}


const request = async (...path:string[]):Promise<any> => {
    switch(path.length){
        case 1:
            return getAllCollectionDocs(getCollection(db,path[0]))
        case 2:
            return getDocument(db,...path)
        case 3:
            return getAllCollectionDocsAsc(getCollectionAsc(db,path.join("/")))
        case 4:
            path.pop()
            return db.collection(path.join("/"))
      }
}
  
const getCollection = async (db:any,collectionName:string) => {
    console.log(db)
    return await (db.collection(collectionName).get())
}

const getCollectionAsc = async (db:any,collectionName:string) => {
    console.log(db)
    return await (db.collection(collectionName).orderBy("timestamp","asc").get())
}

const getAllCollectionDocs = async (collection:Promise<any>) => {
    return (await collection).docs.map((doc:any) => {let id=doc.id; let data = doc.data();return({id:id,data:data})})
}

const getAllCollectionDocsAsc = async (collection:Promise<any>) => {
    return (await collection).docs.map((doc:any) => {let id=doc.id; let data = doc.data();return({id:id,data:data})})
}
  
const getDocument = async (db:any,...args:string[]) => {
    return (await getDoc(doc(db,...args))).data()
}

const getByDocumentByName = async (db:any,...args:string[]) => {
    return (await db.collection(args[0]).doc(args[1]).get())
}

const addMessage = async (callback:Function,message:string,...path:string[]) => {
    //fs.writeFileSync('/tmp/messagehub', message);
    request(...path,"")
        .then(result => result.add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: message,
    })).then(
        callback()
    )

}


const createUser = (username:string,password:string,displayName?:string,imageUrl?:string) => {
    const email = username
    auth.createUserWithEmailAndPassword(email,password)
        .then(authUser => {
            console.log(authUser)
                authUser.user?.updateProfile({
                displayName:displayName || username,
                photoURL: imageUrl  || "",
                })
        })
        .catch(error => {
            console.log("Error")
            console.log(error.message)})
      
}



export {
    signIn,
    signOut,
    createUser,
    request,
    addMessage}