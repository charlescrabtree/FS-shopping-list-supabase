// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, createItem, getItems, buyItem, deleteItems } from './fetch-utils.js';
// pure rendering (data --> DOM):
import { renderItems } from './render-utils.js';
/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const listContainer = document.getElementById('list-container');
const form = document.querySelector('form');
const deleteButton = document.getElementById('delete-button');

// local state:
let itemsArr = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');

    const whatever = await createItem(item, quantity);
    itemsArr.push(whatever);
    displayItems();

    form.reset();
});



async function displayItems() {
    listContainer.textContent = '';


    for (let item of itemsArr) {
        const renderItem = renderItems(item);
        renderItem.addEventListener('click', async () => {
            await buyItem(item.id);

            // if (item.buyItem === true) 
            renderItem.classList.add('item-bought');
            // displayItems();
        });
        listContainer.append(renderItem);
    }
    displayDeleteButton();
}

window.addEventListener('load', async () => {
    itemsArr = await getItems();
    displayItems();
});

function displayDeleteButton() {
    if (itemsArr.length > 0) {
        deleteButton.classList.add('delete-button');
        deleteButton.classList.remove('hidden');
    } else if (itemsArr.length === 0) {
        deleteButton.classList.add('hidden');
    }
}

deleteButton.addEventListener('click', async () => {
    await deleteItems();
    itemsArr = [];
    displayItems();
});

// displayItems();
displayDeleteButton();