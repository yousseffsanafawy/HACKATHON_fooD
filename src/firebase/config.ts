import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJQElTC7568VFbwGkdufWWHdD1yqKEmhA",
  authDomain: "smartfoodai-17f4d.firebaseapp.com",
  projectId: "smartfoodai-17f4d",
  storageBucket: "smartfoodai-17f4d.firebasestorage.app",
  messagingSenderId: "101165253682",
  appId: "1:101165253682:web:405dd09cf52e1c3568282b"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let isFirebaseInitialized = true;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    app = getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  isFirebaseInitialized = false;
}

export { app, auth, db, isFirebaseInitialized };
