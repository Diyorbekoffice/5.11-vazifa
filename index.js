document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loadingPage");
    const cardContainer = document.getElementById("cardContainer");
    const counterText = document.querySelector(".loading-page .counter h1");
    const progressBar = document.querySelector(".loading-page .counter hr");
    const apiUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=12';

    let counter = 0;
    let c = 0;
    const i = setInterval(function () {
        counterText.innerHTML = c + "%";
        progressBar.style.width = c + "%";

        c++;
        counter++;

        if (counter === 101) {
            clearInterval(i);
            loader.style.display = "none";
            cardContainer.style.display = "flex";
        }
    }, 50);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <img src="${photo.thumbnailUrl}" alt="${photo.title}">
                    <h3>${photo.title}</h3>
                `;

                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Data olishda xatolik:', error);
            loader.style.display = "none";
            cardContainer.innerHTML = "<p>Ma'lumotni yuklab olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.</p>";
        });
});
