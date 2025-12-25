
// === PASSWORT (nur SHA-256 Hash, kein Klartext) ===
const PASSWORD_HASH = "0bd042bb5f346bf87910fbc7e2add01c437031187cf46dad03d974fccdfe0243";

// === LOGIN ELEMENTE ===
const loginBox = document.getElementById("login-box");
const mainContent = document.getElementById("main-content");
const loginBtn = document.getElementById("login-btn");
const loginStatus = document.getElementById("login-status");
const passwordInput = document.getElementById("password-input");

// SHA-256 Funktion
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Login prüfen
loginBtn.addEventListener("click", async () => {
  const entered = passwordInput.value;
  const enteredHash = await sha256(entered);

  if (enteredHash === PASSWORD_HASH) {
    loginBox.style.display = "none";
    mainContent.style.display = "block";
  } else {
    loginStatus.textContent = "❌ Falsches Passwort";
  }
});

// === VORGEGEBENE LISTEN ===
const STRASSEN = [
    "Johann Roithner Straße"
];

const HAUSNUMMERN = [];

const OBJEKTE = [
    "Feuerwehr Traun",
    "Rotes Kreuz Traun",
    "Bezirkspolizeikommando Traun",
    "Sonderpolizeiinspektion Traun",
    "Jahrhunderthalle",
    "Spedition Stein",
    "Spar",
    "Krankenhaus",
    "Flughafen",
    "Kiwis Performance",
    "Gasthaus",
    "Hauptbahnhof",
    "Bahnhof Getreidegasse",
    "Raiffeisen Bank",
    "Bezirksgericht Linz Land",
    "Schmelzer Wohngebäude",
    "Straßenmeisterei"
];

const STICHWORTE = [
    "Brandmeldealarm",
    "Brandmeldealarm im Feuerwehrhaus",
    "Brandmeldetaste gedrückt",
    "Brand im Freien",
    "Brand Abfall im Freien",
    "Brand Abfallcontainer",
    "Brand Container im Freien",
    "Brand Kübel im Freien",
    "Brand Bahndamm",
    "Brand Elektroanlage im Freien",
    "Brand Feld",
    "Brand Fluren",
    "Brand Wiese",
    "Brand Stroh im Freien",
    "Brand Gebüsch",
    "Brand Baum",
    "Brand PKW mit Elektroantrieb im Freien",
    "Brand PKW mit Gasantrieb im Freien",
    "Brand PKW im Freien",
    "Brand Zweirad im Freien",
    "Brand Kamin",
    "Brandverdacht",
    "Brand unklare Lage",
    "Brand Anhänger im Freien",
    "Brand Straßenbahn im Freien",
    "Brand landwirtschaftliches Fahrzeug",
    "Brand Baumaschine im Freien",
    "Brand LKW im Freien",
    "Brand Autobus im Freien",
    "Brand Großfahrzeug mit Elektroantrieb im Freien",
    "Brand Großfahrzeug mit Gasantrieb im Freien",
    "Brand Großfahrzeug mit Gefahrstoffen",
    "Brand kleines Luftfahrzeug",
    "Absturz kleines Luftfahrzeug",
    "Brand kleines Wasserfahrzeug",
    "Brand Zug",
    "Brand Gebäude",
    "Brand Tankstelle",
    "Brand Elektroanlage in Gebäude",
    "Brand Carport",
    "Brand Fahrzeug in Gebäude",
    "Brand im Dachbereich",
    "Brand Hochhaus",
    "Brand Industrie",
    "Brand Kleingebäude",
    "Brand Schuppen",
    "Brand Hütte",
    "Brand Gartenhütte",
    "Brand Landwirtschaftliches Objekt",
    "Brand Gebäude mehrstöckig",
    "Brand Gebäude mit Menschenansammlung",
    "Brand Tiefgarage",
    "Brand Gas",
    "Brand mit radioaktiven Stoffen",
    "Brand Schadstoff",
    "Brand Wald",
    "Brand großes Luftfahrzeug",
    "Absturz großes Luftfahrzeug",
    "Brand großes Wasserfahrzeug",
    "Brand Tunnel",
    "Brand Gewerbe",
    "Bergung Kleinfahrzeug",
    "Bergung PKW",
    "Bergung Traktor",
    "Bergung Baumaschine",
    "Bergung Kleinbus",
    "Bergung Zweirad",
    "Bergung Boot",
    "Bergung auf Gewässer",
    "Gleisbereich blockiert",
    "Freimachen von Verkehrswegen",
    "Türöffnung versperrtes KFZ",
    "Aufzugsdefekt",
    "Eingeschlossene Person in Lift",
    "Ölspur/Ölaustritt",
    "Absturzdrohende Gegenstände",
    "Baum droht umzustürzen",
    "Baum ist umgestürzt",
    "Sicherungsdienst Bombe",
    "Dachsicherung",
    "Sicherungsdienst Damm",
    "Sicherungsdienst Gebäude",
    "Gegenstände Sichern",
    "Eisstau",
    "Sicherungsdienst Gewässer",
    "Verklausung",
    "Sicherungsdienst Hochwasser",
    "Gebäude droht überflutet zu werden",
    "Leitung / Mast sichern",
    "Sicherungsdienst Vermurung - Rutschung",
    "Vermurung",
    "Rutschung",
    "Sicherungsarbeiten",
    "Absichern Verkehrsweg",
    "Sonstiger Einsatz",
    "Notstromversorgung",
    "Gebäude überflutet",
    "Keller überflutet",
    "Kanalverstopfung",
    "Wasserschaden",
    "Unterführung überflutet",
    "Überflutete Fahrbahn",
    "Überfluteter Weg",
    "Tragehilfe",
    "Unwettererkundung",
    "Kran droht umzustürzen",
    "Kran ist umgestürzt",
    "Türöffnung Herd eingeschalten",
    "Türöffnung Menschenrettung",
    "Türöffnung Unfallverdacht",
    "Ölaustritt Gewässer",
    "Ölaustritt groß",
    "Person eingeklemmt",
    "Personenrettung Einsturz",
    "Personenevakuierung",
    "Personenrettung Gewässer",
    "Personenrettung hoch (über 10m)",
    "Personenrettung hoch",
    "Person droht zu springen",
    "Personenrettung Stromunfall",
    "Personensuche",
    "Person Suizidverdacht",
    "Personenrettung tief (über 10m)",
    "Personenrettung tief",
    "Personenrettung unwegsames Gelände",
    "Person verschüttet",
    "Person eingesunken",
    "Beleuchtung",
    "Dammbruch",
    "Taucheinsatz",
    "Rettung Großtier",
    "Unterstützung Rettungsdienst",
    "Kleines Wasserfahrzeug in Notlage",
    "Bergung Autobus",
    "Bergung LKW",
    "Bergung Großfahrzeug",
    "Bergung Luftfahrzeug",
    "Ölaustritt Gewässer groß",
    "Flugnotfall Linz-Airport",
    "Großes Wasserfahrzeug in Notlage",
    "Lawine",
    "Rettung Kleintier",
    "Türöffnung Person eingeschlossen",
    "Baum auf Fahrzeug",
    "Baum auf Haus",
    "Baum über Straße",
    "Baum in Stromleitung",
    "Ast/Äste drohen abzubrechen",
    "Straßensperre errichten",
    "Bergung Kleintransporter",
    "Personenrettung hoch",
    "Entlaufenes Tier",
    "Personenrettung hoch - Paragleiter",
    "Hochwasserschutz aufbauen ",
    "Türöffnung Assistenz Polizei",
    "Verkehrsunfall Aufräumarbeiten",
    "Personenrettung Verkehrsunfall PKW",
    "Person unter Fahrzeug - Maschine",
    "Person unter Schienenfahrzeug",
    "Personenrettung Verkehrsunfall Autobus",
    "Personenrettung Verkehrsunfall LKW",
    "Personenrettung Verkehrsunfall Zug",
    "Zugzusammenstoß",
    "Ammoniakaustritt",
    "Chlorgasaustritt",
    "Explosion - Explosionsgefahr",
    "Gasaustritt",
    "Gasgeruch wahrnehmbar",
    "Kohlenmonoxidaustritt",
    "Vergiftungsalarm ausgelöst",
    "Schadstoffeinsatz Gewässer",
    "Schadstoff Kleinmenge",
    "Schadstoffeinsatz Radioaktiv",
    "Schadstoffeinsatz",
    "Schadstoff Dekontamination",
    "Schadstoffeinsatz groß",
    "Chlorgasalarm",
    "Bergung von Gegenständen",
    "Bergung von Toten",
    "Bergung totes Kleintier",
    "Bergung totes Großtier",
    "Brandnachschau",
    "Brandwache",
    "Reinigungsarbeiten",
    "Kleinalarm technisch",
    "Insekteneinsatz",
    "Reptilieneinsatz",
    "Türöffnung ohne Gefahr",
    "Untersuchung",
    "undefinierbarer Geruch",
    "Wassertransport",
    "Türe sichern/verschließen",
    "Ölaustritt Kleinmenge",
    "F-KAT-Einsatz Bezirkswarnstelle",
    "F-KAT-Einsatz Einsatzführungsunterstützung",
    "F-KAT-Einsatz Hochwasserzug",
    "F-KAT-Einsatz Klassischer Zug",
    "F-KAT-Einsatz Personalzug",
    "F-KAT-Einsatz Pumpenzug",
    "F-KAT-Einsatz Schadstoffzug",
    "F-KAT-Einsatz Stab-Groß",
    "F-KAT-Einsatz Stab-Klein",
    "F-KAT-Einsatz Technischer Zug",
    "F-KAT-Einsatz TLF-Zug",
    "F-KAT-Einsatz Vollschutzzug",
    "F-KAT-Einsatz Wasserzug",
    "F-KAT-Einsatz F-KAT-OÖ",
    "ÖWR-Einsatz - Boot angeschwemmt",
    "ÖWR Einsatz - Boot gekentert",
    "ÖWR Einsatz - Boot sichern",
    "ÖWR Einsatz - Boot Sinkt, vermutlich keine Personen am Boot",
    "ÖWR Einsatz - Boot treibt auf Gewässer",
    "ÖWR Einsatz - Boot verhängt",
    "ÖWR Einsatz - Defektes Boot auf Gewässer",
    "ÖWR Einsatz - Herrenloses Boot auf Gewässer",
    "ÖWR Einsatz - Einsatstorno Gewässereinsatz, kein Einsatz mehr erforderlich",
    "ÖWR Einsatz - Boot in Not",
    "ÖWR Einsatz - Boot sinkt, Personenrettung",
    "ÖWR Einsatz - Lichtzeichen auf Gewässer wahrnehmbar",
    "ÖWR Einsatz - Notsignal auf Gewässer wahrnehmbar",
    "ÖWR Einsatz - Paragleiter in Gewässer gestürzt",
    "ÖWR Einsatz - Person auf Gewässer vermisst",
    "ÖWR Einsatz - Person in Not auf Gewässer",
    "ÖWR Einsatz - Person treibt auf Gewässer",
    "ÖWR Einsatz - Taucher in Gewässer vermisst",
    "ÖWR Einsatz - Tauchunfall",
    "ÖWR Einsatz - Undefinierbare Beobachtung auf Gewässer",
    "ÖWR Einsatz - Vermisstes Boot auf Gewässer",
    "ÖWR Einsatz - Abgängige Person nahe Gewässer",
    "ÖWR Einsatz - Einsatz",
    "ÖWR Einsatz - Bereitschaftsalarm",
    "ÖWR Einsatz - Tierbergung",
    "ÖWR Einsatz - Tierrettung",
    "ÖWR Einsatz - Wildwassereinsatz",
    "Sirenenprogramm FEUER von FW ausgelöst",
    "Sirenenprogramm Seveso CPL ausgelöst",
    "Probealarm Wasserrettung",
    "Probealarm Sirenen Oö.",
    "Probealarm Netz OÖ BD Gas",
    "Übungsalarm Technischer Einsatz für Feuerwehr",
    "Übungsalarm Brandeinsatz für Feuerwehr",
    "Technische Probe für Feuerwehr",
    "Probealarm Schulung für Feuerwehr",
    "Probealarm Landeswarnzentrale",
    "Brandmeldeanlagentest",
    "Einsatz od. Übung",
    "Brandmeldetaste Gedrückt",
    "Probealarm Sturmwarnanlagen",
    "Probealarm Rufbereite Land und BH"
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

  if (!strasse || !hausnummer || !objekt || !stichwort || !extra) {
    statusP.textContent = "Fehler: Bitte alle Pflichtfelder ausfüllen.";
    return;
  }

  // Rollen aus Checkboxen sammeln
  const selectedRoles = Array.from(document.querySelectorAll(".role:checked"))
    .map(cb => cb.value);

  const rolePing = selectedRoles.length > 0 ? selectedRoles.join(" ") : "";

  const ort = `${strasse} ${hausnummer} – ${objekt}`;

  const contentLines = [
    rolePing,
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
