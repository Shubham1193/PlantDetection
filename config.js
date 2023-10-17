
import { initializeApp } from "@firebase/app"
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUMo3-Fkytbt6_6fKKT33t5fQdjoK7IAo",
  authDomain: "plantapp-74cb1.firebaseapp.com",
  projectId: "plantapp-74cb1",
  storageBucket: "plantapp-74cb1.appspot.com",
  messagingSenderId: "723523182459",
  appId: "1:723523182459:web:7aa24f3f06ca35631e67de",
  measurementId: "G-G622CWQZ9E"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}