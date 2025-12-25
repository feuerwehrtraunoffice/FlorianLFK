// === KONFIGURATION ===
const ADMIN_PIN = "1234"; // deine Admin-PIN

// Keys für localStorage
const STORAGE_KEYS = {
  STICHWORTE: "ff_alarm_stichworte",
  ADRESSEN: "ff_alarm_adressen",
  WEBHOOK: "ff_alarm_webhook"
};

// Standardwerte
const DEFAULT_STICHWORTE = [
  "Brandmeldealarm",
  "Wohnungsbrand",
  "Verkehrsunfall",
  "Person in Notlage"
];

const DEFAULT_ADRESSEN = [
  "Hauptstraße 1",
  "Marktplatz 5",
  "Industriestraße 12",
  "Schulweg 3"
];

// === Hilfsfunktionen ===
function loadArray(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : fallback;
  } catch {
    return fallback;
  }
}

function saveArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function loadWebhookUrl() {
  return localStorage.getItem(STORAGE_KEYS.WEBHOOK) || "";
}

function saveWebhookUrl(url) {
  localStorage.setItem(STORAGE_KEYS.WEBHOOK, url);
}

function fillSelect(selectElem, values) {
  selectElem.innerHTML = "";
  values.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selectElem.appendChild(opt);
  });
}

// === DOM Elemente ===
const stichwortSelect = document.getElementById("stichwort-select");
const adresseSelect = document.getElementById("adresse-select");
const extraText = document.getElementById("extra-text");
const sendBtn = document.getElementById("send-btn");
const statusP = document.getElementById("status");

const adminPinInput = document.getElementById("admin-pin-input");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminView = document.getElementById("admin-view");

const stichwortListTextarea = document.getElementById("stichwort-list");
const adresseListTextarea = document.getElementById("adresse-list");
const webhookUrlInput = document.getElementById("webhook-url-input");
const saveAdminBtn = document.getElementById("save-admin-btn");
const adminStatusP = document.getElementById("admin-status");

// === Daten laden ===
let stichworte = loadArray(STORAGE_KEYS.STICHWORTE, DEFAULT_STICHWORTE);
let adressen = loadArray(STORAGE_KEYS.ADRESSEN, DEFAULT_ADRESSEN);

fillSelect(stichwortSelect, stichworte);
fillSelect(adresseSelect, adressen);

// === Admin-Login ===
let adminVisible = false;

adminLoginBtn.addEventListener("click", () => {
  const pin = adminPinInput.value;

  if (!adminVisible) {
    if (pin === ADMIN_PIN) {
      adminVisible = true;
      adminView.classList.remove("hidden");

      stichwortListTextarea.value = stichworte.join("\n");
      adresseListTextarea.value = adressen.join("\n");
      webhookUrlInput.value = loadWebhookUrl();
    } else {
      alert("Falsche PIN.");
    }
  } else {
    adminVisible = false;
    adminView.classList.add("hidden");
  }
});

// === Admin speichern ===
saveAdminBtn.addEventListener("click", () => {
  const stichArr = stichwortListTextarea.value
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const adrArr = adresseListTextarea.value
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const webhookUrl = webhookUrlInput.value.trim();

  if (stichArr.length === 0 || adrArr.length === 0) {
    adminStatusP.textContent = "Fehler: Listen dürfen nicht leer sein.";
    return;
  }

  stichworte = stichArr;
  adressen = adrArr;

  saveArray(STORAGE_KEYS.STICHWORTE, stichworte);
  saveArray(STORAGE_KEYS.ADRESSEN, adressen);
  saveWebhookUrl(webhookUrl);

  fillSelect(stichwortSelect, stichworte);
  fillSelect(adresseSelect, adressen);

  adminStatusP.textContent = "Gespeichert.";
});

// === Alarm senden ===
sendBtn.addEventListener("click", async () => {
  const webhookUrl = loadWebhookUrl();
  if (!webhookUrl) {
    statusP.textContent = "Fehler: Kein Webhook konfiguriert.";
    return;
  }

  const stichwort = stichwortSelect.value;
  const adresse = adresseSelect.value;
  const extra = extraText.value.trim();

  const contentLines = [
    "🚨 **Alarmierung der Feuerwehr!**",
    `**Einsatzstichwort:** ${stichwort}`,
    `**Adresse:** ${adresse}`
  ];

  if (extra) {
    contentLines.push(`**Hinweis:** ${extra}`);
  }

  const payload = {
    content: contentLines.join("\n")
  };

  statusP.textContent = "Sende Alarm...";

  try {
    const res = await fetch(webhookUrl, {
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
