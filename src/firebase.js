
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCd6jB2hvxZlGDDHjWq_rEH2E8PlxH1Tf8",
  authDomain: "frimum-613ec.firebaseapp.com",
  projectId: "frimum-613ec",
  storageBucket: "frimum-613ec.firebasestorage.app",
  messagingSenderId: "212032323915",
  appId: "1:212032323915:web:f7fae4d993352c00f0e8ce",
  measurementId: "G-260GBBB2P9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };