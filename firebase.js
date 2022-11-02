
import * as firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCgdCds6rWKFHEbP51AQJMMOxWZN94oz3Q",
  authDomain: "fir-auth-a5a9d.firebaseapp.com",
  projectId: "fir-auth-a5a9d",
  storageBucket: "fir-auth-a5a9d.appspot.com",
  messagingSenderId: "144801761040",
  appId: "1:144801761040:web:7e4d2bd42b86ca12260795"
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore();

export { auth ,  firebase , db };