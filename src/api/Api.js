import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
// import {collection, getDocs } from 'firebase/firestore/lite'
import {getAnalytics} from 'firebase/analytics'
import { firebase, initializeApp } from "firebase/app"
import {onSnapshot, getDatabase, ref, updateDoc, collection, doc, query, getDoc, setDoc, getFirestore, getDocs, addDoc, FieldValue, Firestore, arrayUnion} from 'firebase/firestore'

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

const provider = new FacebookAuthProvider()
const auth = getAuth()


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
    },
    getSignedList: async (userId) => {
        let usersList = []
        // let users = await collection(db, 'users')
        const q = query(collection(db, 'users'))
        const queryUsers = await getDocs(q)

        queryUsers.forEach(result => {
            let data = result.data()
            console.log('user', data)
            if (result.id !== userId) {
                usersList.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                })
            }
        })
        console.log('usersList:', usersList)
        return usersList
    },
    
    addNewChat: async (user1, user2) => {
        let newChat = await addDoc(collection(db, 'chats'), {
            messages: [],
            users:[user1.id, user2.id]
        }) 

        const dataUser1 = doc(db, 'users', user1.id)
        const dataUser2 = doc(db, 'users', user2.id)

        await updateDoc(dataUser1, {
            chats: arrayUnion({
                chatId: newChat.id, 
                chatTitle: user2.name,
                avatar: user2.avatar,
                with: user2.id
            })
        })
        await updateDoc(dataUser2, {
            chats: arrayUnion({
                chatId: newChat.id, 
                chatTitle: user1.name,
                avatar: user1.avatar,
                with: user1.id
            })
        })
    },
    addNewMsg: async (user, msg, chat) => {
        await updateDoc(doc(db, 'chats', chat.id), {
            messages: arrayUnion({
                author: user,
                msg
            })
        })
    },

    onChatList: (userId, setChatList) => {
        return onSnapshot(doc(db, 'users', userId), (doc) => {
            if(doc.exists) {
                let data = doc.data()
                if(data.chats) {
                    setChatList(data.chats)
                }
            }
        })
    },
    onChatMsgs: (chatId, setChatMsgs, setUsersInChat) => {
        return onSnapshot(doc(db, 'chats', chatId), (doc) => {
            if(doc.exists) {
                let data = doc.data()
                console.log('dataOnChatMsgs:', data)
                console.log('data.users: ', data.users)
                setChatMsgs(data.messages)
                setUsersInChat(data.users)
            }
        })
    },
    sendMsg: async (chat, userId, type, body, chatUsers) => {
        let now = new Date()
        await updateDoc(doc(db, 'chats', chat.chatId), {
            messages: arrayUnion({
                type,
                author: userId,
                body,
                date: now
            })
        })

        for (let i in chatUsers) {
            console.log('chatUsersI: ', chatUsers[i])
            let user = doc(db, 'users', chatUsers[i])
            let userDoc = await getDoc(user)
            let userData = userDoc.data()
            console.log('userData: ', userData)
            if(userData.chats) {
                let chats = [...userData.chats]

                for (let e in chats) {
                    if(chats[e].chatId == chat.chatId) {
                        chats[e].lastMsg = body
                        chats[e].lastMsgDate = now
                    }
                }

                await updateDoc(doc(db, 'users', chatUsers[i]), {
                    chats
                })
            }
        }
    }
}