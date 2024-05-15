// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, get, onValue, set  } from "firebase/database"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaA892aBTWsWn8yALUn3JD8FbF5jQuTcM",
  authDomain: "license-d68c6.firebaseapp.com",
  databaseURL: "https://license-d68c6-default-rtdb.firebaseio.com",
  projectId: "license-d68c6",
  storageBucket: "license-d68c6.appspot.com",
  messagingSenderId: "920802157990",
  appId: "1:920802157990:web:870146acf5c9c4e769db67"
};

const app = initializeApp(firebaseConfig);

const dbFirestore = getFirestore(app);

export { dbFirestore, getDatabase, ref, get, onValue, set  }; // 변경된 부분
export default app;