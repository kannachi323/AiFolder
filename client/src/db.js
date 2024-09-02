import { get, set } from 'idb-keyval';

export function setItem(key, value) {
  set(key, value)
    .then(() => console.log('Item set!'))
    .catch(err => console.log('It failed!', err));
}
export function getItem(key) {
  return get(key)
    .then(val => {
      console.log('Got value:', val);
      return val;  // Return the value here so that it can be used by the caller
    })
    .catch(err => {
      console.log('It failed!', err);
      throw err;  // Rethrow the error if you want the caller to handle it
    });
}