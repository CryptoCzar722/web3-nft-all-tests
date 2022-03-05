//import * as firebase from "firebase";
//import "firebase/firestore";

import firebase from 'firebase/compat/app' //import firebase from 'firebase/app'
//import {getFireStore} from "firebase/firestore"

import 'firebase/compat/firestore'         //import 'firebase/firestore'
//import 'firebase/compat/database'       
// import 'firebase/compat/auth'              //import 'firebase/auth'

let config = {
  apiKey: "AIzaSyAO_VQwPCpZyzonop3bBLPACcj5l5d8jZg",
    authDomain: "smart-nft-s.firebaseapp.com",
    projectId: "smart-nft-s",
    storageBucket: "smart-nft-s.appspot.com",
    messagingSenderId: "1014406463230",
    appId: "1:1014406463230:web:4946fc14cdf1c8df1bafaf",
    measurementId: "G-VC1TV70CLK"
};

firebase.initializeApp(config);

export default firebase.firestore();//getFireStore(); //