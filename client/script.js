// Färgöversättning (färger baserade på användarens färgdata men modifierade)
const colorMap = {
  red: "#A22522",
  gray: "#707070",
  green: "#32533D",
  purple: "#65256A",
  yellow: "#EFBD1A",
};

// URL till backend-servern för att hämta användardata
const url = "http://localhost:3000/users";

// Hämta data från servern med fetch
fetch(url)
  .then((response) => {
    // När servern svarar
    if (!response.ok) {
      // Om svaret inte är OK
      throw new Error(`Serverfel: ${response.status}`); // Kasta ett fel
    }
    return response.json(); // Omvandla svaret till JSON
  })
  .then((users) => {
    // När användardata har hämtats
    console.log("Användare hämtade från servern:", users); // Logga användardata till konsolen

    // Skapa ett <ul> element för listan
    const ul = document.createElement("ul");

    // Loopa igenom alla användare
    users.forEach((user) => {
      const li = document.createElement("li"); // Skapa ett <li> element för varje användare

      // Modifiera bakgrundsfärgen baserat på användarens färg
      const modifiedColor = colorMap[user.color] || user.color; // Om ingen matchning finns i colorMap, använd originalfärgen
      li.style.backgroundColor = modifiedColor; // Sätt bakgrundsfärgen på li-elementet

      // Skapa HTML-struktur för varje användare
      const userHtml = `
     <li class="d-flex justify-content-center align-items-center text-center p-4 mb-3 rounded-5" style="background-color: ${modifiedColor}">
       <div>
         <h3>${user.firstName} ${user.lastName}</h3>
         <p>Username: ${user.username}</p>
         <p>ID: ${user.id}</p>
       </div>
     </li>
   `;

      // Infoga HTML-koden för användaren innan slutet av <ul>
      ul.insertAdjacentHTML("beforeend", userHtml);
    });

    // Lägg till hela <ul> till body för att visa det på sidan
    document.body.appendChild(ul);
  })
  .catch((error) => {
    // Om ett fel inträffar i processen
    console.error("Ett fel inträffade:", error.message); // Logga felet till konsolen
  });
