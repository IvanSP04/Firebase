export default async function mostrarHome() {
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = "<h2>🎴 Cartas de Yu-Gi-Oh!</h2><p>Cargando cartas...</p>";

    try {
        // Obtener cartas aleatorias de la API
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0");
        const data = await response.json();
        
        appContainer.innerHTML = "<h2>🎴 Cartas de Yu-Gi-Oh!</h2>";
        
        // Crear un contenedor flex para las cartas
        const cardsContainer = document.createElement("div");
        cardsContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            padding: 20px;
        `;
        
        data.data.forEach((carta) => {
            const card = document.createElement("div");
            card.style.cssText = `
                border: 2px solid #333;
                border-radius: 10px;
                padding: 15px;
                width: 280px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                transition: transform 0.2s;
            `;
            
            card.onmouseenter = () => card.style.transform = "scale(1.05)";
            card.onmouseleave = () => card.style.transform = "scale(1)";
            
            card.innerHTML = `
                <img src="${carta.card_images[0].image_url_small}" 
                     alt="${carta.name}" 
                     style="width: 100%; border-radius: 5px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                <div class="app-info">
                    <h3 style="margin: 10px 0; color: #ffd700; font-size: 1.1em;">${carta.name}</h3>
                    <p><strong>🎯 Tipo:</strong> ${carta.type}</p>
                    <p><strong>⭐ Atributo:</strong> ${carta.attribute || 'N/A'}</p>
                    <p><strong>📊 Nivel:</strong> ${carta.level || 'N/A'}</p>
                    ${carta.atk !== undefined ? `<p><strong>⚔️ ATK:</strong> ${carta.atk} | <strong>🛡️ DEF:</strong> ${carta.def || 0}</p>` : ''}
                    <p style="font-size: 0.85em; line-height: 1.3; margin-top: 10px;">${carta.desc.substring(0, 100)}...</p>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
        
        appContainer.appendChild(cardsContainer);
        
    } catch (error) {
        console.error("Error al cargar las cartas:", error);
        appContainer.innerHTML = "<p style='color: #ff6b6b;'>❌ Error al cargar las cartas de Yu-Gi-Oh! 😢</p>";
    }
}