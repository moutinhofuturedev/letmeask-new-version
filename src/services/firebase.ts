import firebase from 'firebase/app'

import 'firebase/auth' // importação dos serviços usados dentro do firebase
import 'firebase/database' // importação dos serviços usados dentro do firebase

const firebaseConfig = {
  apiKey: "AIzaSyCeYkNabAJSXrqtRZSzlHpL3e_jRQNGpFA",
  authDomain: "letmeask-c97ee.firebaseapp.com",
  databaseURL: "https://letmeask-c97ee-default-rtdb.firebaseio.com",
  projectId: "letmeask-c97ee",
  storageBucket: "letmeask-c97ee.appspot.com",
  messagingSenderId: "967153801618",
  appId: "1:967153801618:web:8d318890cad58cabb9894b"
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database} 

