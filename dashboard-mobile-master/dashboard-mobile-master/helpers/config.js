import { View, Text } from 'react-native'
import React from 'react'
import firebase from "@react-native-firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDT_1jg_-kpLjkx2KUHJq8Hu0tZKauAZCA",
    authDomain: "fil-global-246ad.firebaseapp.com",
    databaseURL: "https://fil-global-246ad-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fil-global-246ad",
    storageBucket: "fil-global-246ad.appspot.com",
    messagingSenderId: "446612696205",
    appId: "1:446612696205:web:bbb500a73a61dd11c846c4",
    measurementId: "G-2H9Y1QFS7J"
  };


export const configuration = firebase.initializeApp(firebaseConfig)

export default config