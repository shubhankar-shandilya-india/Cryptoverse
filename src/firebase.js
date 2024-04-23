import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import firebaseConfig from './config/firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp)

export { auth, db , provider}