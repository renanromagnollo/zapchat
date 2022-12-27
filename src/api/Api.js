import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import {getAnalytics} from 'firebase/analytics'
import { initializeApp } from "firebase/app"
import {doc, setDoc, getFirestore} from 'firebase/firestore'

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
        // await db.collection('users').doc(u.id).set({
        //     name: u.name, 
        //     avatar: u.avatar
        // }, {merge: true})
        console.log('user:', u)
    }
}