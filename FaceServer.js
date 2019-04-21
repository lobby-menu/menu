const SERVER_ROOT = 'http://192.168.43.233:8080';

function createFace(path) {
  const body = new FormData();
  const file = {
    uri: path,
    name: 'image.jpg',
    type: 'image/jpg',
  };
  body.append('image', file);

  return fetch(`${SERVER_ROOT}/faces/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  }).then(res => res.json())
    .catch(e => console.log(e));
}

function identify(faces) {
  const body = JSON.stringify({ faces: faces.map(face => face.id) });

  return fetch(`${SERVER_ROOT}/faces/identify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  }).then(res => res.json())
    .catch(e => console.log(e));
}

function relation(faces, person) {
  const body = JSON.stringify(
    Object.assign(
      { faces: faces.map(face => face.id) },
      person ? { person } : {},
    ),
  );

  return fetch(`${SERVER_ROOT}/faces/relation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  }).then(res => res.json())
    .catch(e => console.log(e));
}

function getBioID(faces) {
  return identify(faces)
    .then((identify) => {
      console.log('Identify:', identify);
      const { scores } = identify[0];
      if (scores.length <= 0 || scores[0].average > 0.25) return Promise.resolve(null);

      return Promise.resolve(scores[0].person);
    }).then((person) => {
      console.log('Person:', person);
      return relation(faces, person);
    });
}

export { createFace, getBioID };
