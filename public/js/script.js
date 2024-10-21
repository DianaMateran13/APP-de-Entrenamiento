document.addEventListener('DOMContentLoaded', () => {
    const generarRutinaBtn = document.getElementById('generar-rutina');
    const objetivoSelect = document.getElementById('objetivo');
    const rutinaResultado = document.getElementById('rutina-resultado');

    generarRutinaBtn.addEventListener('click', async () => {
        const objetivo = objetivoSelect.options[objetivoSelect.selectedIndex].text;
        
        try {
            const response = await fetch('/generate-routine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ objetivo }),
            });

            if (!response.ok) {
                throw new Error('Error al generar la rutina');
            }

            const data = await response.json();
            rutinaResultado.innerHTML = `<h2>Tu rutina de ${objetivo}:</h2><p>${data.rutina}</p>`;
        } catch (error) {
            console.error('Error:', error);
            rutinaResultado.innerHTML = '<p>Lo siento, hubo un error al generar la rutina. Por favor, intenta de nuevo.</p>';
        }
    });
});
