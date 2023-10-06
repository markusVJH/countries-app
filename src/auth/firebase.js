// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnNl8b62l1VJnVAQJxRpQ2SNv2LwY0AV0",
  authDomain: "countries-react23k-ab7e4.firebaseapp.com",
  projectId: "countries-react23k-ab7e4",
  storageBucket: "countries-react23k-ab7e4.appspot.com",
  messagingSenderId: "346304998610",
  appId: "1:346304998610:web:ede6c4ef14a5ab3807510b",
  measurementId: "G-Q3X4XWKP6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  }
  catch (err) {
    console.log(err)
    alert(err.message)
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        authProvided: 'local',
        email,
    })
  }
  catch (err) {
    console.log(err)
    alert(err.message)
  }
}

const logout = () => {
  signOut(auth)
}

export const addFavouriteToFirebase = async (uid, name) => {
  try {
  await addDoc(collection(db, `users/${uid}/favourites`), { name });
  } catch (err) {
  }
  };

export const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    if (!name) {
    return;
    }
    const q = query(collection(db, `users/${uid}/favourites`), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
    });
    } catch (err) {
    }
  };

export const clearFavouritesFromFirebase = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/favourites`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
    });
    } catch (err) {
    }
    };

export { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logout};