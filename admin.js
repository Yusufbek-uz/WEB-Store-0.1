const API_URL = "https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/webstore";

async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    renderProducts(products);
}

function renderProducts(products) {
    const tableBody = document.getElementById("product-table-body");
    tableBody.innerHTML = "";
    products.forEach(product => {
        const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td><img src="${product.image}" alt="${product.name}" width="50" height="50"></td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>$${product.price}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    </tr>
                `;
        tableBody.innerHTML += row;
    });
}

async function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
    const image = document.getElementById("image").value;

    const newProduct = { name, description, price, stock, image };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });

    fetchProducts();
    document.getElementById("addProductForm").reset();
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
}

async function editProduct(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("image").value = product.image;

    await deleteProduct(id);
}

document.getElementById("addProductForm").addEventListener("submit", addProduct);
fetchProducts();