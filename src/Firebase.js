
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    //called firebaseapp
    apiKey: "AIzaSyAZMxXtbZhY0GOyBqzPlh4hZ6Hgok_7S5s",
    authDomain: "fir-app-13837.firebaseapp.com",
    projectId: "fir-app-13837",
    storageBucket: "fir-app-13837.appspot.com",
    messagingSenderId: "762517830952",
    appId: "1:762517830952:web:2208affabac33cc13a641d"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;

