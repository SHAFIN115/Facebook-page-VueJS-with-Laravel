import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCCTjVIQpZq4AkTUleVVovk35qxtUk_kgw",
  authDomain: "fir-auth-f1414.firebaseapp.com",
  projectId: "fir-auth-f1414",
  storageBucket: "fir-auth-f1414.appspot.com",
  messagingSenderId: "95676861680",
  appId: "1:95676861680:web:843f0db7175e95b4084635",
  measurementId: "G-K265W163T2"
};

initializeApp(firebaseConfig);
const firebaseAuth = getAuth();
// console.debug('firebaseAuth', firebaseAuth);

export { firebaseAuth };
