import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
// import {collection, getDocs } from 'firebase/firestore/lite'
import {getAnalytics} from 'firebase/analytics'
import { firebase, initializeApp } from "firebase/app"
import {getDatabase, ref, updateDoc, collection, doc, query, getDoc, setDoc, getFirestore, getDocs, addDoc, FieldValue, Firestore, arrayUnion} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "zapchat-85077.firebaseapp.com",
    projectId: "zapchat-85077",
    storageBucket: "zapchat-85077.appspot.com",
    messagingSenderId: "12367305874",
    appId: process.env.REACT_APP_FIREBASE_API_ID,
    measurementId: "G-X4WCFL1E9Q"
  }


const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
const db = getFirestore(firebaseApp)


// const googleLogin = async () => {
//     const provider = new GoogleAuthProvider()
//     provider.addScope('https://www.googleapis.com/auth/cloud-platform.read-only')
// }

const provider = new FacebookAuthProvider()
const auth = getAuth()

// const facebookLoginPopup = () => {
//     signInWithPopup(auth, provider)
//         .then(result => {
//             // const user = result.user
//             const credential = FacebookAuthProvider.credentialFromResult(result)
//             const credentialToken = credential.accessToken
//             return result
//         })

// }
const facebookLoginPopup = async () => await signInWithPopup(auth, provider)

export default {
    fbPopup: async () => {
        let result = await facebookLoginPopup()
        return result
    },
    addUser: async (u) => {
        await setDoc(doc(db, 'users', u.id), {
            name: u.name, 
            avatar: u.avatar
        }, {merge: true})
        // console.log('user:', u)
        // await db.collection('users').doc(u.id).set({
        //     name: u.name, 
        //     avatar: u.avatar
        // }, {merge: true})
    },
    getContactList: async (userId) => {
        let list = []
        // let users = await collection(db, 'users')
        const q = query(collection(db, 'users'))
        const queryUsers = await getDocs(q)

        queryUsers.forEach(result => {
            let data = result.data()
            console.log('user', data)
            if (result.id !== userId) {
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                })
            }
        })
        console.log('list:', list)
        return list
    },
    
    addNewChat: async (user1, user2) => {
        let newChat = await addDoc(collection(db, 'chats'), {
            messages: [],
            users:[user1.id, user2.id]
        }) 
        // await setDoc(doc(db, 'chats'), {
        //     messages: [],
        //     users:[user1.id, user2.id]
        // }) 
        const dataUser1 = doc(db, 'users', user1.id)
        const dataUser2 = doc(db, 'users', user2.id)

        await updateDoc(dataUser1, {
            chats: arrayUnion({
                chatId: newChat.id, 
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        })
        await updateDoc(dataUser2, {
            chats: arrayUnion({
                chatId: newChat.id, 
                title: user1.name,
                image: user1.avatar,
                with: user1.id
            })
        })
        //     chats: FieldValue.arrayUnion({
        //         chatId: newChat.id, 
        //         title: user1.name,
        //         image: user1.avatar,
        //         with: user1.id
        //     }) 
        // })
        // await updateDoc(dataUser1, {
        //     chats: FieldValue.arrayUnion({
        //         chatId: newChat.id, 
        //         title: user2.name,
        //         image: user2.avatar,
        //         with: user2.id
        //     }) 
        // })

        // await setDoc(doc(db, 'users', user1.id), {
        //     chats: [
        //         {
        //             chatId: newChat.id, 
        //             title: user2.name,
        //             image: user2.avatar,
        //             with: user2.id
        //         }]
               
            
            // chats: firebaseApp.firestore.FieldValue.arrayUnion({
            //     chatId: newChat.id, 
            //     title: user2.name,
            //     image: user2.avatar,
            //     with: user2.id
            // })
        // }, {merge: true})

        // await setDoc(doc(db, 'users', user2.id), {
        //     chats:  
        //         {
        //             chatId: newChat.id, 
        //             title: user1.name,
        //             image: user1.avatar,
        //             with: user1.id
        //         }
            
            // chats: firebaseApp.firestore.FieldValue.arrayUnion({
            //     chatId: newChat.id, 
            //     title: user2.name,
            //     image: user2.avatar,
            //     with: user2.id
            // })
            // }, {merge: true})
        
        // await setDoc(doc(db, 'users', user2.id), {
        //     chats: firebaseApp.firestore.FieldValue.arrayUnion({
        //         chatId: newChat.id, 
        //         title: user1.name,
        //         image: user1.avatar,
        //         with: user1.id
        //     })
        // }, {merge: true})
    }
}