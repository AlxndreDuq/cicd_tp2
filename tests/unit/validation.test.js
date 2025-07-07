const { validateFormInput } = require('../../src/fonctions');

test('valide un nom et email corrects', () => {
  expect(validateFormInput({ name: 'Alex', email: 'alex@example.com' })).toBe(true);
});

test('rejette un nom vide', () => {
  expect(validateFormInput({ name: '', email: 'alex@example.com' })).toBe(false);
});

test('rejette un email vide', () => {
  expect(validateFormInput({ name: 'Alex', email: '' })).toBe(false);
});

test('rejette un email sans @', () => {
  expect(validateFormInput({ name: 'Alex', email: 'alexexample.com' })).toBe(false);
});
