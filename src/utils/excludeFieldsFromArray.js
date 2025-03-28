export default function excludeFieldsFromArray(fields, user) {
  return Object.keys(user).reduce((acc, key) => {
    if (!fields.includes(key)) acc[key] = user[key];
    return acc;
  }, {});
}
