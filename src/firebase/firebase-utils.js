import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB3HQ-4WyNhUbdGm4EbbMBf9_4VxgktRMg",
  authDomain: "ecommerce-13c23.firebaseapp.com",
  databaseURL: "https://ecommerce-13c23.firebaseio.com",
  projectId: "ecommerce-13c23",
  storageBucket: "ecommerce-13c23.appspot.com",
  messagingSenderId: "802557188714",
  appId: "1:802557188714:web:f49740f79cccaff8e38813",
  measurementId: "G-V478P3T0K0"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);  
    
    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch (error){
        console.log('error Creating user', error.message);
      }
    }
    return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);      
    });

    return await batch.commit();
  };


  firebase.initializeApp(config);

  export const convertCollectionSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
      const { title, items } = docSnapshot.data();

      return{
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
      };
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {})
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;