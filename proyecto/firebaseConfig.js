import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
apiKey: "AIzaSyAFR5U_zVgCa4RBCe7vm5xGgkOQOPLhGXg",
authDomain: "yu-gi-oh--cards-api-74b11.firebaseapp.com",
projectId: "yu-gi-oh--cards-api-74b11",
storageBucket: "yu-gi-oh--cards-api-74b11.firebasestorage.app",
messagingSenderId: 655602385536,
appId: "1:655602385536:web:cf55eb79f9e9c3a5d89c65"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app); // ✅ ¡Esto es necesario!
export { auth, db };