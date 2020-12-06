export function deepMerge<T1, T2>(obj1: T1, obj2: T2): T1 & T2 {
  const result: any = {};
  Object.entries(obj1).forEach(([key, value]) => {
    if (key in obj2) {
      // potential overwrite
      if (typeof value !== typeof obj2[key]) {
        // value type mismatch, always take obj2's values.
        result[key] = obj2[key];
      } else if (typeof value === 'object') {
        result[key] = deepMerge(value, obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    } else {
      result[key] = value;
    }
  });
  Object.entries(obj2)
    .filter(([key]) => !(key in obj1))
    .forEach(([key, value]) => {
      result[key] = value;
    });
  return result;
}
