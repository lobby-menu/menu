const SERVER_ROOT = 'http://192.168.43.233:9000';
const ASSET_FOLDER = '/assets';

function getProductsForCategory(category) {
  return fetch(`${SERVER_ROOT}/product/list?category=${encodeURIComponent(category)}`)
    .then(res => res.json());
}

function getCategories() {
  return fetch(`${SERVER_ROOT}/category/list`)
    .then(res => res.json())
    .then(imgs => imgs.map(img => Object.assign(img, { image_path: `${SERVER_ROOT + ASSET_FOLDER}/${img.image_path}` })));
}

function sendOrder(items, person, table) {
  const body = JSON.stringify({
    table,
    bio_identity: person,
    creation_date: new Date().getTime(),
    orders: items.map(item => ({ count: item.count, item: item.id })),
    done: false,
  });

  console.log('order', body);
  return fetch(`${SERVER_ROOT}/order/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export { getProductsForCategory, getCategories, sendOrder };
