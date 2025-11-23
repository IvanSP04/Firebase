import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import mostrarLogin from './src/componentes/Login.js';
import mostrarRegistro from './src/componentes/registro.js';
import mostrarHome from './src/componentes/home.js';
import mostrarOriginal from './src/componentes/Original.js';
import mostrarLogout from './src/componentes/logout.js';
import './style.css'

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario logueado - Muestra menú completo
        document.getElementById("menu").innerHTML = `
            <nav style="background: #333; padding: 15px; text-align: center;">
                <button id="menuHome" style="margin: 5px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">🏠 Home</button>
                <button id="menuOriginal" style="margin: 5px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">🔍 Buscar Cartas</button>
                <button id="menuLogout" style="margin: 5px; padding: 10px 20px; background: #ff6b6b; color: white; border: none; border-radius: 5px; cursor: pointer;">🚪 Logout</button>
            </nav>
        `;
        
        document.getElementById("menuHome").addEventListener("click", mostrarHome);
        document.getElementById("menuOriginal").addEventListener("click", mostrarOriginal);
        document.getElementById("menuLogout").addEventListener("click", mostrarLogout);
        
        mostrarHome(); // Mostrar home por defecto al loguearse
        
    } else {
        // Usuario NO logueado - Muestra login y registro
        document.getElementById("menu").innerHTML = `
            <nav style="background: #333; padding: 15px; text-align: center;">
                <button id="menuLogin" style="margin: 5px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">🔑 Login</button>
                <button id="menuRegistro" style="margin: 5px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">📝 Registro</button>
            </nav>
        `;
        
        document.getElementById("menuLogin").addEventListener("click", mostrarLogin);
        document.getElementById("menuRegistro").addEventListener("click", mostrarRegistro);
        
        mostrarLogin(); // Mostrar login por defecto
    }
});