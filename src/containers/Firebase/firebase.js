import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    // Only initialize Firebase if API key is provided
    if (config.apiKey && config.apiKey !== 'your-api-key-here') {
      try {
        const app = initializeApp(config);
        this.auth = getAuth(app);
        this.db = getFirestore(app);
        this.googleProvider = new GoogleAuthProvider();
        this.isInitialized = true;
      } catch (error) {
        console.warn('Firebase initialization failed:', error.message);
        this.isInitialized = false;
      }
    } else {
      console.warn('Firebase not initialized: Missing API key. Create a .env file with your Firebase credentials.');
      this.isInitialized = false;
    }
  }

  doSignInWithEmailAndPassword = (email, password) => {
    if (!this.isInitialized) return Promise.reject(new Error('Firebase not initialized'));
    return signInWithEmailAndPassword(this.auth, email, password);
  };

  doCreateUserWithEmailAndPassword = async () => {
    if (!this.isInitialized) {
      console.log('Firebase not initialized - skipping authentication');
      return Promise.resolve();
    }
    console.log('CONNECTED');
    return Promise.resolve();
  };

  doSignOut = () => {
    if (!this.isInitialized) return Promise.resolve();
    return signOut(this.auth);
  };
}

export default Firebase;
