
export const firebaseConfig = {
    apiKey: "AIzaSyBTqwkpfQZ9-BOnuIQf_7KLAic-tIQtWuQ",
    authDomain: "arla-farm-app.firebaseapp.com",
    databaseURL: "https://arla-farm-app.firebaseio.com",
    projectId: "arla-farm-app",
    storageBucket: "arla-farm-app.appspot.com",
    messagingSenderId: "314379371265",
    appId: "1:314379371265:web:ecb14a50653cd27a2ad100"
  };
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
 export const db = firebase.firestore();
