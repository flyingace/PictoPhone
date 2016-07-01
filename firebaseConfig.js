import firebase from 'firebase';

// Initialize Firebase
var config = {
    serviceAccount: "pictophone-c68ba790d44c.json",
    apiKey: "AIzaSyA53QLiHClQ6oFSgYC8Adt3bhvd5I1i2Vk",
    // authDomain: "project-1689613375215710431.firebaseapp.com",
    databaseURL: "https://project-1689613375215710431.firebaseio.com",
    storageBucket: "project-1689613375215710431.appspot.com"
};

export const FIREBASE = firebase.initializeApp(config);
