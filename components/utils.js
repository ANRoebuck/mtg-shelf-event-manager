

const randomElementFromArray = (arr) => arr[Math.floor(Math.random()*arr.length)];

const peek = (arr) => arr[arr.length - 1];

const lowestFirst = (a,b) => a - b;

const incrementObjectOfNumbers = (object, key) => {
  if (!object[key]) object[key] = 1;
  else object[key] += 1;
  return object;
}
const pushToObjectOfArrays = (object, key, value) => {
  if (!object[key]) object[key] = [value];
  else object[key].push(value);
  return object;
}








module.exports = {
  incrementObjectOfNumbers,
  lowestFirst,
  peek,
  pushToObjectOfArrays,
  randomElementFromArray,
}
