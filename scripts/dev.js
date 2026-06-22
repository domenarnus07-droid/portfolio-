/*
  Lasten zagon dev strežnika z "brutalnim" bannerjem.
  Banner se izpiše SAMO ENKRAT (ob zagonu): URL, dan, datum, ura.
  Privzete Next.js logge skrijemo (prikažemo le napake).

  Uporaba: npm run dev   (port prek PORT, privzeto 3888)
*/

const { spawn } = require("child_process");

const PORT = process.env.PORT || "3888";
const URL = `http://localhost:${PORT}`;

// ANSI barve
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[38;5;46m",
  orange: "\x1b[38;5;208m",
  gray: "\x1b[38;5;245m",
  white: "\x1b[97m",
};

const DNEVI = ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"];
const MESECI = [
  "januar", "februar", "marec", "april", "maj", "junij",
  "julij", "avgust", "september", "oktober", "november", "december",
];

const pad = (n) => String(n).padStart(2, "0");

const ASCII = [
  "  ██████╗  ███████╗ ██╗   ██╗",
  "  ██╔══██╗ ██╔════╝ ██║   ██║",
  "  ██║  ██║ █████╗   ██║   ██║",
  "  ██║  ██║ ██╔══╝   ╚██╗ ██╔╝",
  "  ██████╔╝ ███████╗  ╚████╔╝ ",
  "  ╚═════╝  ╚══════╝   ╚═══╝  ",
];

function row(label, value, labelColor) {
  const pad36 = " ".repeat(Math.max(0, 36 - value.length));
  return `  ${c.gray}│${c.reset}  ${labelColor}${label}${c.reset}${" ".repeat(8 - label.length)}${c.white}${value}${pad36}${c.gray}│${c.reset}`;
}

function printBanner() {
  const now = new Date();
  const dan = DNEVI[now.getDay()];
  const datum = `${now.getDate()}. ${MESECI[now.getMonth()]} ${now.getFullYear()}`;
  const ura = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const urlPad = " ".repeat(Math.max(0, 41 - URL.length));

  console.log("");
  ASCII.forEach((l) => console.log(`  ${c.green}${c.bold}${l}${c.reset}`));
  console.log("");
  console.log(`  ${c.gray}┌──────────────────────────────────────────────┐${c.reset}`);
  console.log(`  ${c.gray}│${c.reset}  ${c.orange}${c.bold}➜${c.reset}  ${c.white}${c.bold}${URL}${c.reset}${urlPad}${c.gray}│${c.reset}`);
  console.log(`  ${c.gray}├──────────────────────────────────────────────┤${c.reset}`);
  console.log(row("Dan", dan, c.green));
  console.log(row("Datum", datum, c.green));
  console.log(row("Ura", ura, c.green));
  console.log(`  ${c.gray}└──────────────────────────────────────────────┘${c.reset}`);
  console.log("");
  console.log(`  ${c.dim}ustavi z Ctrl+C${c.reset}\n`);
}

printBanner();

const child = spawn("npx", ["next", "dev", "-p", PORT], { shell: true, env: process.env });

// Next.js logge skrijemo; pokažemo le napake.
child.stderr.on("data", (d) => {
  const txt = d.toString().trim();
  if (txt) console.error(`${c.orange}[next]${c.reset} ${txt}`);
});

function cleanup() {
  child.kill();
  process.exit(0);
}
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
