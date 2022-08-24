// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser } from './fetch-utils.js';
// pure rendering (data --> DOM):
import { renderItmes } from './render-utils.js';
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
let itemsArr= [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');

    const newItem = await createItem(item, quantity);
    itemsArr.push(newItem);

    await displayItems();

    form.reset();
});
// events:
