const db = require('../src/db/connection');

async function seed() {
  await db.promise().query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    )
  `);
  await db.promise().query('DELETE FROM submissions');
  await db.promise().query('INSERT INTO submissions (name, email) VALUES (?, ?)', ['Alice', 'alice@example.com']);
  process.exit();
}

seed();
