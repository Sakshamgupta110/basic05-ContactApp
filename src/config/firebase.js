// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCujZ8Naz3qyJYPTqiYmoKAbqU61jpZOYs",
  authDomain: "contactapp-d3b88.firebaseapp.com",
  projectId: "contactapp-d3b88",
  storageBucket: "contactapp-d3b88.firebasestorage.app",
  messagingSenderId: "435096685540",
  appId: "1:435096685540:web:ed042f2f354fbb247bd5f1",
  measurementId: "G-718CYGQ2XE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
const analytics = getAnalytics(app);
