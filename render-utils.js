export function renderItems(item) {
    const itemDiv = document.createElement('div');
    const iP = document.createElement('p');
    const qP = document.createElement('p');

    iP.textContent = item.item;
    qP.textContent = `(${item.quantity})`;

    if (item.bought === true) {
        itemDiv.classList.add('item-bought');
    } else {
        itemDiv.classList.add('list-item');
    }


    itemDiv.append(iP, qP);

    return itemDiv;

}