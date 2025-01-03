const nameInput = document.getElementById("name")
const phoneNumber = document.getElementById("phoneNumber")
const addBtn = document.getElementById("add-btn")
const contactsList = document.getElementById("contacts")
let users;

async function getUsers() {
    const javob = await fetch("https://676a7d60863eaa5ac0de8d4e.mockapi.io/api/v1/users");
    users = await javob.json();
    usersView(users);
}
getUsers()

function usersView(data) {
    contactsList.innerHTML = "";
    data.forEach(user => {
        const li = document.createElement("li");
        li.setAttribute("data-id", user.id);
        li.innerHTML = `
          <i class="fa-solid fa-user"></i>
                <div class="list">
                    <div>
                        <h2>Name:${user.name}</h2>
                        <p>${user.phoneNumber}/${user.name}</p>
                    </div>
                    <div class="btn-box">
                         <button id="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                         <button id="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
         `;
        contactsList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    if (nameInput.value.trim().length < 1) {
        alert("Please don't create Many Error 404");
    } else { }
})

async function addContact(ism, tel) {
    try {
        const response = await fetch("https://676a7d60863eaa5ac0de8d4e.mockapi.io/api/v1/users",
            {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: ism,
                    phoneNumber: +tel
                })
            }
        );
        nameInput.value = "";
        phoneNumber.value = "";
        getUsers();
    } catch (error) {
        console.log(error);
    }
}
addContact()