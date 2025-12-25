// === FESTER DISCORD WEBHOOK ===
const WEBHOOK_URL = "https://discord.com/api/webhooks/1453706544028975308/6wG-adxUUL5SUH4HczARyFzVAemqBcrAcKWM-gvHd4aRKIQcEeWmbXHQSHwcxNFZ5dsA";

// === VORGEGEBENE ORTE ===
// Format: Straße, Hausnummer, Objekt
const ORTE = [
  { strasse: "Hauptstraße", hausnummer: "12", objekt: "Supermarkt Lidl" },
  { strasse: "Bahnhofstraße", hausnummer: "3", objekt: "Bahnhofshalle" },
  { strasse: "Industriestraße", hausnummer: "7", objekt: "Lagerhalle Nord" },
  { strasse: "Rathausplatz", hausnummer: "2", objekt: "Rathaus" },
  { strasse: "Schulweg", hausnummer: "5", objekt: "Volksschule" }
];

// === VORGEGEBENE STICHWORTE ===
const STICHWORTE = [
  "Brandmeldealarm",
  "Wohnungsbrand",
  "Verkehrsunfall",
  "Person in Notlage",
  "Tierrettung",
  "Ölspur",
  "Unklare Rauchentwicklung"
];

// === DOM ELEMENTE ===
const ortSelect = document.getElementById("ort-select");
const stichwortSelect = document.getElementById("stichwort-select");
const prioCheckbox = document.getElementById("prio-checkbox");
const extraText = document.getElementById("extra-text");
const sendBtn = document.getElementById("send-btn");
const statusP = document.getElementById("status");

// === LISTEN FÜLLEN ===
function fillOrtSelect() {
  ORTE.forEach(o => {
    const opt = document.createElement("option");
    opt.value = `${o.strasse} ${o.hausnummer} – ${o.objekt}`;
    opt.textContent = `${o.strasse} ${o.hausnummer} – ${o.objekt}`;
    ortSelect.appendChild(opt);
  });
}

function fillStichwortSelect() {
  STICHWORTE.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    stichwortSelect.appendChild(opt);
  });
}

fillOrtSelect();
fillStichwortSelect();

// === ALARM SENDEN ===
sendBtn.addEventListener("click", async () => {
  const ort = ortSelect.value;
  const stichwort = stichwortSelect.value;
  const extra = extraText.value.trim();
  const prio = prioCheckbox.checked ? "Priorität A" : "Priorität B";

  // Pflichtfeld prüfen
  if (extra.length === 0) {
    statusP.textContent = "Fehler: Nachricht ist ein Pflichtfeld.";
    return;
  }

  const contentLines = [
    "🚨 **Alarmierung der Feuerwehr – Florian LFK!**",
    `**Einsatzort:** ${ort}`,
    `**Einsatzstichwort:** ${stichwort}`,
    `**${prio}**`,
    `**Nachricht:** ${extra}`
  ];

  const payload = {
    content: contentLines.join("\n")
  };

  statusP.textContent = "Sende Alarm...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      statusP.textContent = "Alarm erfolgreich gesendet.";
      extraText.value = "";
    } else {
      statusP.textContent = "Fehler beim Senden. HTTP-Status: " + res.status;
    }
  } catch (err) {
    console.error(err);
    statusP.textContent = "Netzwerkfehler beim Senden.";
  }
});
