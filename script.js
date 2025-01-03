const search = document.getElementById('search');
const price = document.getElementById('price');
const qoldiq = document.getElementById('qoldiq');
const cards = document.getElementById('cards');
let card;

async function getCard() {
    try {
        const javob = await fetch("https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/webstore");
        if (!javob.ok) throw new Error("Failed to fetch data");
        card = await javob.json();
        cardView(card);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getCard();

function cardView(data) {
    if (!Array.isArray(data)) {
        console.error("Data is not an array");
        return;
    }

    cards.innerHTML = "";
    data.forEach(e => {
        const div = document.createElement("div");
        div.setAttribute("data-id", e.id);
        div.innerHTML = `
        <div class="card" data-aos="flip-down">
            <img src="${e.image}" alt="" width="200">
            <h1>${e.name}</h1>
            <hr>
            <p class="text">${e.description}</p>
            <h2>Price: <span><b>${e.price}</b> $</span></h2>
            <button class="buy-btn" id="buy">Buy</button>
            <span class="stock" id="qoldi" title="Stock">${e.stock}</span>
        </div>
        `;

        const buyB = div.querySelector('.buy-btn');
        buyB.addEventListener('click', async () => {
            if (e.stock > 0) {
                e.stock--;
                await updateStock(e.id, e.stock);
                div.querySelector('.stock').textContent = e.stock;
            } else {
                alert("Bu tavardan boshqa qolmadi !!");
            }
        });

        cards.appendChild(div);
    });
}

async function updateStock(id, stock) {
    await fetch(`https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/webstore/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock }),
    });
}
