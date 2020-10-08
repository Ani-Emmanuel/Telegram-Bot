const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("UserTable", (err) => {
  if (err) throw err;
  console.log("connected");
  db.run(
    `CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId integer
        )`,
    (err) => {
      if (err) console.error(err);
    }
  );
});

module.exports = db;
