// === FESTER DISCORD WEBHOOK ===
const WEBHOOK_URL = "https://discord.com/api/webhooks/1453136888750932040/P0FXeWBPsOtnflJt3zO-57iLNoHF3MpwbzmiY5b1mXlUvcSWMn5WxgenI2BpHyKHjL7Z";

// === VORGEGEBENE LISTEN ===
const STRASSEN = [
  "Johann Roithner Straße",
  "Hauptstraße",
  "Bahnhofstraße",
  "Industriestraße",
  "Rathausplatz",
  "Schulweg"
];

const HAUSNUMMERN = ["1", "2", "3", "5", "7", "12"];

const OBJEKTE = [
  "Stadtpolizeikommando Traun",
  "Bahnhofshalle",
  "Lagerhalle Nord",
  "Rathaus",
  "Volksschule"
];

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
const strasseInput = document.getElementById("strasse-input");
const hausnummerInput = document.getElementById("hausnummer-input");
const objektInput = document.getElementById("objekt-input");
const stichwortInput = document.getElementById("stichwort-input");
const prioCheckbox = document.getElementById("prio-checkbox");
const sireneCheckbox = document.getElementById("sirene-checkbox");
const extraText = document.getElementById("extra-text");
const sendBtn = document.getElementById("send-btn");
const statusP = document.getElementById("status");

// Eine einzige Rolle, die IMMER gepingt wird
const ROLE_PING = "<@&1453753092347531416>";

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

fillDatalist("strassen", STRASSEN);
fillDatalist("hausnummern", HAUSNUMMERN);
fillDatalist("objekte", OBJEKTE);
fillDatalist("stichwoerter", STICHWORTE);

// === ALARM SENDEN ===
sendBtn.addEventListener("click", async () => {
  const strasse = strasseInput.value.trim();
  const hausnummer = hausnummerInput.value.trim();
  const objekt = objektInput.value.trim();
  const stichwort = stichwortInput.value.trim();
  const extra = extraText.value.trim();

  const prio = prioCheckbox.checked ? "Priorität A" : "Priorität B";
  const sirene = sireneCheckbox.checked ? "🔊 Sirenenalarmierung" : "🔕 Stille Alarmierung";

  // Pflichtfelder prüfen
  if (!strasse || !hausnummer || !objekt || !stichwort || !extra) {
    statusP.textContent = "Fehler: Bitte alle Pflichtfelder ausfüllen.";
    return;
  }

  const ort = `${strasse} ${hausnummer} – ${objekt}`;

  const contentLines = [
    `${ROLE_PING}`,
    "# 🚨 **Einsatz Alarmierung Feuerwehr Traun!**",
    `**Einsatzort:** ${ort}`,
    `**Einsatzstichwort:** ${stichwort}`,
    `**${prio}**`,
    `**${sirene}**`,
    `**Nachricht:** ${extra}`
  ];

  const payload = { content: contentLines.join("\n") };

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
