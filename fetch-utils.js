const SUPABASE_URL = 'https://hvbgkvbafgvsatqlesna.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2YmdrdmJhZmd2c2F0cWxlc25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEyOTU3MTYsImV4cCI6MTk3Njg3MTcxNn0.N-IG55-eTO1A_uOwUe9xr9xbhi04MW_5BqWqln4SRI8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createItem(item, quantity) {
    const response = await client
        .from('list')
        .insert({ item: item, quantity: quantity, bought: false, user_id: client.auth.user().id }).single();
    
    return checkError(response);
}

export async function getItems() {
    const response = await client
        .from('list')
        .select('*')
        .order('id');
    
    return checkError(response);
}

export async function buyItem(id) {
    const response = await client
        .from('list')
        .update({ bought: true })
        .match({ id: id });

    return checkError(response);
}

export async function deleteItems() {
    const response = await client
        .from('list')
        .delete()
        .match({ user_id: client.auth.user().id });
    
    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}