import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';
import mostrarLogin from './Login.js';

export default function mostrarLogout() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <p style="font-size: 1.5em; color: #667eea;">⏳ Cerrando sesión...</p>
        </div>
    `;

    // Cerrar sesión y redirigir al login
    signOut(auth)
        .then(() => {
            mostrarLogin();
        })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
            mostrarLogin(); // Aun con error, regresamos al login
        });
}