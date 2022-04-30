import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "recipe-app-d345c.firebaseapp.com",
  projectId: "recipe-app-d345c",
  storageBucket: "recipe-app-d345c.appspot.com",
  messagingSenderId: "6135447290",
  appId: "1:6135447290:web:8cd8ceb9ce33d1c0bed343"
};

//init Firebase
initializeApp(firebaseConfig)

//init Cloud Firestore database
const db = getFirestore()
//init Firebase Storage voor het uploaden en bewaren van foto's
const storage = getStorage()

export { db, storage }