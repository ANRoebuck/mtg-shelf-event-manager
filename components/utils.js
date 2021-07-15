

const randomElementFromArray = (arr) => arr[Math.floor(Math.random()*arr.length)];

const peek = (arr) => arr[arr.length - 1];

const lowestFirst = (a,b) => a - b;
const highestFirst = (a,b) => b - a;

const shuffleArray = (arr) => arr
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)

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
  highestFirst,
  incrementObjectOfNumbers,
  lowestFirst,
  peek,
  pushToObjectOfArrays,
  randomElementFromArray,
  shuffleArray,
}
