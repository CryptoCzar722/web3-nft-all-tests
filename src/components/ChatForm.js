import React, { Component } from 'react'
import './App.css';                         //TAG doesnt work
import firebase from 'firebase/compat/app' //import firebase from 'firebase/app'
import 'firebase/compat/database'       
import 'firebase/compat/firestore'         //import 'firebase/firestore'
import 'firebase/compat/auth'              //import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAO_VQwPCpZyzonop3bBLPACcj5l5d8jZg",
  authDomain: "smart-nft-s.firebaseapp.com",
  projectId: "smart-nft-s",
  storageBucket: "smart-nft-s.appspot.com",
  messagingSenderId: "1014406463230",
  appId: "1:1014406463230:web:4946fc14cdf1c8df1bafaf",
  measurementId: "G-VC1TV70CLK"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

//function ChartForm(){
class ChatForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          user : ''
        }
        //this.user = this.user.bind(this);
      }
    render() {
        return(
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
            }}>
                <button id = "whitelist" > Join AirDrop / Whitelist </button>
            </form>
        )
            
        }
}
//export default ChatForm;
export default () =>{
    const [user] = useAuthState(auth);
   // if (!this.state.user){
        //this.setState({user})
   // }
    return(
        <ChatForm user = {user}/>
    )
}

function SignIn(user){
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }

    return (
    <button onClick = {signInWithGoogle}>Sign in with Google</button>
    )
}

function SignOut(user){
    return auth.currentUser && (
    <button onClick = {() => auth.SignOut()}>Sign Out</button>
    )
}

function ChatRoom(){

}
