/**
 * sets value in local storage with provided key
 * @param key
 * @param value
 */
function localStorageSetItem(key, value) {
  localStorage.setItem(key, value);
}

/**
 * @param key
 * @returns value of local storage item with the key
 */
function localStorageGetItem(key) {
  return localStorage.getItem(key);
}

/**
 * removes local storage item that matches with given key
 * @param key
 */
function localStorageRemoveItem(key) {
  localStorage.removeItem(key);
}
