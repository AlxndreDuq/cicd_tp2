function validateFormInput({ name, email }) {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return false;
  }
  if (
    !email ||
    typeof email !== 'string' ||
    email.trim() === '' ||
    !email.includes('@')
  ) {
    return false;
  }
  return true;
}

module.exports = { validateFormInput };
