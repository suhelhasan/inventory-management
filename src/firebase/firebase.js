import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDNfTrNBIyo8E3JU7EqlgKwGkCK7tgJ298",
  authDomain: "inventory-management-e1c53.firebaseapp.com",
  databaseURL: "https://inventory-management-e1c53.firebaseio.com",
  projectId: "inventory-management-e1c53",
  storageBucket: "inventory-management-e1c53.appspot.com",
  messagingSenderId: "1038949955429",
  appId: "1:1038949955429:web:3b7761fe074c6382a2138c",
  measurementId: "G-CK211WGP8R",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
