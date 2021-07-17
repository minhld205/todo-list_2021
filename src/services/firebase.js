import firebase from "firebase";

export const COLLECTION_TODOS = "todos";

const config = {
    apiKey: "AIzaSyDzMvpKQ9LrkAexLyTT3yaj6eh2UrxEtaQ",
    authDomain: "todos2021-e22e4.firebaseapp.com",
    databaseURL: "https://todos2021-e22e4-default-rtdb.firebaseio.com",
    projectId: "todos2021-e22e4",
    storageBucket: "todos2021-e22e4.appspot.com",
    messagingSenderId: "631916863788",
    appId: "1:631916863788:web:b94f59a0263b1101f48c89",
    measurementId: "G-8K011FD9VK"
};

firebase.initializeApp(config);
export const db = firebase.firestore();
