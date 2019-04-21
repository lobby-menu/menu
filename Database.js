function emptyBasket() {
  return { count: 0, price: 0 };
}

const state = { faces: [], basket: [], basketState: emptyBasket() };

function addFace(face) {
  state.faces.push(face);
}

function clearFaces() {
  state.faces = [];
}

function getFaces() {
  return state.faces;
}

function getTable() {
  return 5;
}

function removeOneFromBasket(item) {
  const foundItem = state.basket.find(i => i.id === item.id);
  if (!foundItem) return;
  foundItem.count -= 1;

  state.basketState.count -= 1;
  state.basketState.price -= item.price;

  if (foundItem.count <= 0) state.basket.splice(state.basket.indexOf(foundItem));
}

function addToBasket(item) {
  let foundItem = state.basket.find(i => i.id === item.id);

  if (!foundItem) {
    foundItem = Object.assign({ count: 0 }, item);
    state.basket.push(foundItem);
  }

  foundItem.count += 1;

  state.basketState.count += 1;
  state.basketState.price += item.price;
}

function getBasketItems() {
  return state.basket;
}

function clearBasket() {
  state.basket = [];
  state.basketState = emptyBasket();
}

function getBasketState() {
  return state.basketState;
}

export {
  addFace,
  clearFaces,
  getFaces,
  addToBasket,
  getBasketItems,
  clearBasket,
  getBasketState,
  removeOneFromBasket,
  getTable,
};
