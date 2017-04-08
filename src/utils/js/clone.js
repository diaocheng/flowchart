export default function (object) {
  if (typeof object !== 'object') {
    return object;
  }
  const obj = Array.isArray(object) ? [] : {};
  for (let key in object) {
    obj[key] = object[key];
  }
  return obj;
};
