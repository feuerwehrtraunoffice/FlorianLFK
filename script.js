// === FESTER DISCORD WEBHOOK ===
const WEBHOOK_URL = "https://discord.com/api/webhooks/1453706544028975308/6wG-adxUUL5SUH4HczARyFzVAemqBcrAcKWM-gvHd4aRKIQcEeWmbXHQSHwcxNFZ5dsA";

// === ORTE MIT AUTOMATISCHER ADRESSZUORDNUNG ===
const ORTE = [
  { objekt: "Supermarkt Lidl", strasse: "Hauptstraße", hausnummer: "12" },
  { objekt: "Bahnhofshalle", strasse: "Bahnhofstraße", hausnummer: "3" },
  { objekt: "Lagerhalle Nord", strasse: "Industriestraße", hausnummer: "7" },
  { objekt: "Rathaus", strasse: "Rathausplatz", hausnummer: "2" },
  { objekt: "Volksschule", strasse: "Schulweg", hausnummer: "5" }
];

// === STICHWORTE MIT AUTOMATISCHER PRIORITÄT ===
const STICHWORTE = [
  "Brandmeldealarm",
  "Wohnungsbrand",
  "Verkehrsunfall",
  "Person in Notlage",
  "Tierrettung",
  "Ölspur",
  "Unklare Rauchentwicklung"
];

const AUTO_PRIO = {
  "Brandmeldealarm": true,
  "Wohnungsbrand": true,
  "Verkehrsunfall": true,
  "Person in Notlage": true,
  "Tierrettung": false,
  "Ölspur": false,
  "Unklare Rauchentwicklung": false
};

// === DOM ELEMENTE ===
const strasseInput = document.getElementById("strasse-input");
const hausnummerInput = document.getElementById("hausnummer-input");
const objektInput = document.getElementById("objekt-input");
const stichwortInput = document.getElementById("stichwort-input");
const prioCheckbox = document.getElementById("prio-checkbox");
const extraText = document.getElementById("extra-text");
const sendBtn = document.getElementById("send-btn");
const statusP = document.getElementById("status");

// === LISTEN FÜLLEN ===
function fillDatalist(id, values) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  values.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v;
    list.appendChild(opt);
  });
}

fillDatalist("objekte", ORTE.map(o => o.objekt));
fillDatalist("strassen", ORTE.map(o => o.strasse));
fillDatalist("hausnummern", ORTE.map(o => o.hausnummer));
fillDatalist("stichwoerter", STICHWORTE);

// === AUTOMATISCHE ADRESSAUSWAHL BEI OBJEKT ===
objektInput.addEventListener("input", () => {
  const obj = objektInput.value.trim();
  const eintrag = ORTE.find(o => o.objekt === obj);
  if (eintrag) {
    strasseInput.value = eintrag.strasse;
    hausnummerInput.value = eintrag.hausnummer;
  }
});

// === AUTOMATISCHE PRIORITÄT BEI STICHWORT ===
stichwortInput.addEventListener("input", () => {
  const stw = stichwortInput.value.trim();
  if (AUTO_PRIO.hasOwnProperty(stw)) {
    prioCheckbox.checked = AUTO_PRIO[stw];
  }
});

// === ALARM SENDEN ===
sendBtn.addEventListener("click", async () => {
  const strasse = strasseInput.value.trim();
  const hausnummer = hausnummerInput.value.trim();
  const objekt = objektInput.value.trim();
  const stichwort = stichwortInput.value.trim();
  const extra = extraText.value.trim();
  const prio = prioCheckbox.checked ? "Priorität A" : "Priorität B";

  if (!strasse || !hausnummer || !objekt || !stichwort || !extra) {
    statusP.textContent = "Fehler: Bitte alle Pflichtfelder ausfüllen.";
    return;
  }

  const ort = `${strasse} ${hausnummer} – ${objekt}`;

  const payload = {
    content: [
      "🚨 **Alarmierung der Feuerwehr – Florian LFK!**",
      `**Einsatzort:** ${ort}`,
      `**Einsatzstichwort:** ${stichwort}`,
      `**${prio}**`,
      `**Nachricht:** ${extra}`
    ].join("\n")
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
    statusP.textContent = "Netzwerkfehler beim Senden.";
  }
});
