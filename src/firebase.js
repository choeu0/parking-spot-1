// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, onValue  } from "firebase/database"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLGVq7zU2b3TzXxMWrJVeWjLiiMxjXNbo",
  authDomain: "parkingslot-b0c6a.firebaseapp.com",
  databaseURL: "https://parkingslot-b0c6a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "parkingslot-b0c6a",
  storageBucket: "parkingslot-b0c6a.appspot.com",
  messagingSenderId: "857808591399",
  appId: "1:857808591399:web:67f0b9988109dc4da04c02",
  measurementId: "G-DE80Q18NPQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { getDatabase, ref, get, onValue  }; // 변경된 부분
export default app;