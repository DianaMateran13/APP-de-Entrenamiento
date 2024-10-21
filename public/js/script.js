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

// Agregar esto al final del archivo existente

const userInput = document.getElementById('user-input');
const sendQuestionBtn = document.getElementById('send-question');
const chatMessages = document.getElementById('chat-messages');

sendQuestionBtn.addEventListener('click', async () => {
    const question = userInput.value.trim();
    if (question) {
        // Mostrar la pregunta del usuario
        chatMessages.innerHTML += `<p><strong>Tú:</strong> ${question}</p>`;
        userInput.value = '';

        try {
            const response = await fetch('/ask-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener respuesta');
            }

            const data = await response.json();
            // Mostrar la respuesta del asistente
            chatMessages.innerHTML += `<p><strong>Asistente:</strong> ${data.answer}</p>`;
        } catch (error) {
            console.error('Error:', error);
            chatMessages.innerHTML += '<p><strong>Asistente:</strong> Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.</p>';
        }

        // Hacer scroll hacia abajo para mostrar el mensaje más reciente
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
