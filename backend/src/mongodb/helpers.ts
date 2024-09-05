export function stripUndefined<T>(object: T): T {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (element === undefined) {
        delete object[key];
      } else if (typeof element === 'object') {
        stripUndefined(object[key]);
      }
    }
  }

  return object;
}
