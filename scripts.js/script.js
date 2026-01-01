const addBtn = document.getElementById("add");
const input = document.getElementById("input");
const addEditModal = document.getElementById("add-edit-modal");
const closeBtn = document.querySelector(".close-btn");
const enterNameInput = document.getElementById("enter-name");
const enterNumberInput = document.getElementById("enter-number");
const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save");

const contactsArray = [];

function add(value) {
  addEditModal.classList.remove("hide");

  if (/^\d+$/.test(value)) {
    enterNumberInput.value = value;
  } else {
    enterNameInput.value = value;
  }
}

async function syncContact(contact) {
  try {
    const res = await fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    if (!res.ok) throw new Error();
  } catch (err) {
    console.error(err);
  }
}

function close() {
  addEditModal.classList.add("hide");
  input.value = "";
  enterNameInput.value = "";
  enterNumberInput.value = "";
}

addBtn.addEventListener("click", () => {
  add(input.value.trim());
});

closeBtn.addEventListener("click", () => {
  close();
});

cancelBtn.addEventListener("click", () => {
  close();
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const contact = {
    id: Date.now(),
    name: enterNameInput.value,
    no: enterNumberInput.value,
  };

  contactsArray.push(contact);

  syncContact(contact);

  close();
});
