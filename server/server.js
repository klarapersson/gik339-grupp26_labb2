// Importera express
const express = require("express");

// Skapa serverobjektet
const server = express();

//Importera sqlite3-paketet
const sqlite3 = require("sqlite3").verbose();

// Sätt övergripande inställningar
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

// Starta servern på port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/users");
});

// Skapa den första route som hanterar GET-förfrågningar på /users
server.get("/users", (req, res) => {
  // Skapa en databasanslutning
  const db = new sqlite3.Database("./gik339-labb2.db");
  // Hämta alla rader från tabellen users
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      // Om det finns ett fel i databasen, skicka ett felmeddelande
      return res.status(500).send(err);
    } else {
      // Skicka tillbaka de hämtade raderna från databasen som svar
      res.send(rows);
    }
  });
});
