// === FESTER DISCORD WEBHOOK ===
const WEBHOOK_URL = "https://discord.com/api/webhooks/1453706544028975308/6wG-adxUUL5SUH4HczARyFzVAemqBcrAcKWM-gvHd4aRKIQcEeWmbXHQSHwcxNFZ5dsA";

// === VORGEGEBENE LISTEN ===
const STICHWORTE = [
  "Brandmeldealarm",
  "Wohnungsbrand",
  "Verkehrsunfall",
  "Person in Notlage",
  "Tierrettung",
  "Ölspur",
  "Unklare Rauchentwicklung"
];

const ADRESSEN = [
  "Hauptstraße 1",
  "Marktplatz 5",
  "Industriestraße 12",
  "Schulweg 3",
  "Bahnhofstraße 7",
  "Rathausplatz 2"
];

// === DOM ELEMENTE ===
const stichwortSelect = document.getElementById("stichwort-select");
const adresseSelect = document.getElementById("adresse-select");
const extraText = document.getElementById("extra-text");
const sendBtn = document.getElementById("send-btn");
const statusP = document.getElementById("status");

// === LISTEN FÜLLEN ===
function fillSelect(selectElem, values) {
  values.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selectElem.appendChild(opt);
  });
}

fillSelect(stichwortSelect, STICHWORTE);
fillSelect(adresseSelect, ADRESSEN);

// === ALARM SENDEN ===
sendBtn.addEventListener("click", async () => {
  const stichwort = stichwortSelect.value;
  const adresse = adresseSelect.value;
  const extra = extraText.value.trim();

  const contentLines = [
    "🚨 **Alarmierung der Feuerwehr – Florian LFK!**",
    `**Einsatzstichwort:** ${stichwort}`,
    `**Adresse:** ${adresse}`
  ];

  if (extra.length > 0) {
    contentLines.push(`**Hinweis:** ${extra}`);
  }

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
