//Zeige deine API nicht offentlich
const API_KEY = "API"

const submitIcon = document.querySelector("#submit-icon");
const inputEl = document.querySelector("input");
const imageSection = document.querySelector('.images-section')

// Funktion, um Bilder von der Open AI API abzurufen
const getImages = async () => {
    // Definieren Sie die API-Anfrageoptionen
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            prompt: inputEl.value, // Verwendung der eingegebenen Text als Anfrage
            n: 4, // Anzahl der abzurufenden Bilder
            size: "1024x1024" // Größe der Bilder
        })
    }
    try {
        //Anfrage an die OpenAI-API senden
        const response = await fetch("https://api.openai.com/v1/images/generations", options)
        const data = await response.json()

        //Die erhaltenen Bildobjekte durchlaufen und sie zur Seite hinzufügen
        data ?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            const imageEl = document.createElement("img")
            imageEl.setAttribute("src", imageObject.url)
            imageContainer.append(imageEl);
            imageSection.append(imageContainer)
        })
    } catch (error) {
        console.error(error);
    }
}

// Event-Listener für die Eingabetaste
inputEl.addEventListener('keydown', async(event) => {
    if (event.key === 'Enter') {
        try {
            await getImages();
        } catch (error) {
            console.error(error);
        }
    }
});

// Event-Listener für das Klicken auf das 'Submit'-Symbol
submitIcon.addEventListener('click', getImages)