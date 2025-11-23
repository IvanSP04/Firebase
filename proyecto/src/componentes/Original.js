import { db, auth } from '../../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default function mostrarOriginal() {
    const contenedor = document.getElementById("app");
    contenedor.innerHTML = `
        <h2>🎴 Buscar Cartas de Yu-Gi-Oh!</h2>
        <div style="margin-bottom: 20px;">
            <input type="text" id="searchInput" placeholder="Buscar carta por nombre..." style="padding: 10px; width: 300px;">
            <button id="btnBuscar" style="padding: 10px 20px; margin-left: 10px;">Buscar</button>
        </div>
        <div id="resultados"></div>
    `;

    document.getElementById("btnBuscar").addEventListener("click", async () => {
        const searchTerm = document.getElementById("searchInput").value.trim();
        const resultadosDiv = document.getElementById("resultados");
        
        if (!searchTerm) {
            alert("Por favor ingresa un nombre de carta");
            return;
        }

        resultadosDiv.innerHTML = "<p>🔍 Buscando cartas...</p>";

        try {
            const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`);
            
            if (!response.ok) {
                throw new Error("No se encontraron cartas");
            }
            
            const data = await response.json();
            
            resultadosDiv.innerHTML = "";
            
            // Mostrar las primeras 10 cartas
            data.data.slice(0, 10).forEach(carta => {
                const cardDiv = document.createElement("div");
                cardDiv.style.cssText = `
                    border: 2px solid #333;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                `;
                
                cardDiv.innerHTML = `
                    <div style="display: flex; gap: 20px; align-items: start;">
                        <img src="${carta.card_images[0].image_url_small}" 
                             alt="${carta.name}" 
                             style="width: 150px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                        <div style="flex: 1;">
                            <h3 style="margin-top: 0; color: #ffd700;">${carta.name}</h3>
                            <p><strong>🎯 Tipo:</strong> ${carta.type}</p>
                            <p><strong>⭐ Atributo:</strong> ${carta.attribute || 'N/A'}</p>
                            <p><strong>📊 Nivel:</strong> ${carta.level || 'N/A'}</p>
                            ${carta.atk !== undefined ? `<p><strong>⚔️ ATK:</strong> ${carta.atk} | <strong>🛡️ DEF:</strong> ${carta.def || 0}</p>` : ''}
                            <p style="font-size: 0.9em; line-height: 1.4;">${carta.desc.substring(0, 150)}...</p>
                            <button class="btnGuardar" 
                                    data-id="${carta.id}" 
                                    style="background: #ffd700; color: #333; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 10px;">
                                💾 Guardar como Favorita
                            </button>
                        </div>
                    </div>
                `;
                
                resultadosDiv.appendChild(cardDiv);

                // Agregar evento al botón de guardar
                cardDiv.querySelector(".btnGuardar").addEventListener("click", async () => {
                    await guardarCartaFavorita(carta);
                });
            });
        } catch (error) {
            resultadosDiv.innerHTML = "<p style='color: #ff6b6b;'>❌ Error al buscar cartas o no se encontraron resultados</p>";
            console.error(error);
        }
    });
    
    // Permitir buscar con Enter
    document.getElementById("searchInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            document.getElementById("btnBuscar").click();
        }
    });
}

async function guardarCartaFavorita(carta) {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert("⚠️ Debes estar logueado para guardar favoritas");
            return;
        }

        await addDoc(collection(db, "cartas_favoritas"), {
            userId: user.uid,
            cartaId: carta.id,
            nombre: carta.name,
            tipo: carta.type,
            imagen: carta.card_images[0].image_url,
            imagenPequeña: carta.card_images[0].image_url_small,
            atributo: carta.attribute || 'N/A',
            nivel: carta.level || 'N/A',
            atk: carta.atk || 'N/A',
            def: carta.def || 'N/A',
            descripcion: carta.desc,
            fechaGuardado: new Date().toISOString()
        });
        
        alert(`✅ ¡Carta "${carta.name}" guardada en tus favoritas!`);
    } catch (error) {
        console.error("Error al guardar carta:", error);
        alert("❌ Error al guardar la carta: " + error.message);
    }
}