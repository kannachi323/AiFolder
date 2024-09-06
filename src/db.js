import { get, set, keys } from 'idb-keyval';

export function setItem(key, value) {
  set(key, value)
    .then(() => console.log('Item set!'))
    .catch(err => console.log('It failed!', err));
}
export async function getItem(key) {
  try {
    const val = await get(key);
    console.log('Got value:', val);
    return val;
  } catch (err) {
    console.log('It failed!', err);
    throw err; // Rethrow the error if you want the caller to handle it
  }
}

export async function getUserKeys(defaultFolders) {
  return keys()
    .then(keys => {
      return keys.filter(key => !defaultFolders.includes(key));
    });
}