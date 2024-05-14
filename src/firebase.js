
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCvvdbknFcR7qotKzBiceIgWPigvkFnlQA",
  authDomain: "netflix-clone-ea68a.firebaseapp.com",
  projectId: "netflix-clone-ea68a",
  storageBucket: "netflix-clone-ea68a.appspot.com",
  messagingSenderId: "293783879501",
  appId: "1:293783879501:web:9492ba746ee652abf74104",
  measurementId: "G-YJZPBDHE1L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid, 
            name, 
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].replace(/-/g, ' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].replace(/-/g, ' '));
    }
}


const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout error:", error);
        toast.error(error.message);
    }
}

export {auth, db, login, signup, logout}
