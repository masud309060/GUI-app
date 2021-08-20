import firebaseConfig from "./firebase.config";
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;
