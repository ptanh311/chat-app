import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdGxcEfR6hTwP3r88fMl8TwTShYC305aQ",
    authDomain: "new-chat-app-5d0e6.firebaseapp.com",
    projectId: "new-chat-app-5d0e6",
    storageBucket: "new-chat-app-5d0e6.appspot.com",
    messagingSenderId: "1085766913081",
    appId: "1:1085766913081:web:f010c8dd2e655fd1a091e8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();


