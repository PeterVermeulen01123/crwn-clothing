import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

 const config = {
    apiKey: "AIzaSyDsJ7_ItnCPMJFy8FY2HrKiFAX7q2maMyw",
    authDomain: "crwn-db-4f67b.firebaseapp.com",
    projectId: "crwn-db-4f67b",
    storageBucket: "crwn-db-4f67b.appspot.com",
    messagingSenderId: "940605758245",
    appId: "1:940605758245:web:0e8510117a0c2522a398cc"
  };

  export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...addtionalData
            })
        }catch(error){
            console.log('error creating user: ', error.message)
        }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;