const config = {
  // Day 1 = 11 May 2026 because 12 May 2026 is Day 2.
  startDate: new Date(2026, 4, 11),
  totalDays: 7,
  unlockHour: 20,
  previewUnlockAllDays: false
};

const stateKey = "blueLettersStateV1";
const stateVersion = 3;

const letters = [
  {
    day: 1,
    title: "",
    sealed: "",
    text: "ซองแรกไม่มีอะไรมาก แค่อยากแอบวางความรู้สึกดีๆ ไว้ตรงนี้ เผื่อเธอเปิดมาแล้ววันธรรมดาจะดูน่ารักขึ้นนิดนึง"
  },
  {
    day: 2,
    title: "",
    sealed: "",
    text: "วันนี้ขอให้เธอเจอเรื่องดีๆ สักเรื่องนะ ถ้ายังไม่เจอ นับซองนี้เป็นเรื่องดีเล็กๆ แทนก็ได้ คนทำตั้งใจใส่มาให้แล้ว"
  },
  {
    day: 3,
    title: "",
    sealed: "",
    text: "วันนี้ไม่มีมีมแนบมา แต่มีความตั้งใจแนบมาแทน อาจจะฮาไม่เท่ามีม แต่ถ้าทำให้เธอยิ้มมุมปากได้สักนิดก็ถือว่าผ่าน"
  },
  {
    day: 4,
    title: "",
    sealed: "",
    text: "ถ้าวันนี้เหนื่อย ขอให้รู้ไว้ว่ามีคนแอบเชียร์เธออยู่แบบเงียบๆ นะ ไม่ได้ถือป้ายไฟใหญ่มาก เดี๋ยวเธอตกใจ แต่อยู่ตรงนี้แหละ"
  },
  {
    day: 5,
    title: "",
    sealed: "",
    text: "วันนี้ขอส่งแต้มกำลังใจให้ 1 แต้ม ใช้ได้ทันที ไม่มีวันหมดอายุ และถ้าเธอยิ้มตอนอ่าน ถือว่าแต้มนี้ทำงานสำเร็จแล้ว"
  },
  {
    day: 6,
    title: "",
    sealed: "",
    text: "ซองนี้เป็นโหมดพักก่อนนะ ถ้าวันนี้แบตเหลือน้อยก็ไม่ต้องฝืน เดี๋ยวคนทำซองนั่งเฝ้าสถานีชาร์จใจให้แบบเงียบๆ"
  },
  {
    day: 7,
    title: "",
    sealed: "",
    text: "เค้ารอคำตอบจากเธออยู่นะ\nแต่ไม่ต้องรีบตอบก็ได้\n\nวันนี้เธออาจจะเหนื่อยมามาก\nเธอเก่งมากๆ เลยที่ผ่านวันเหนื่อยๆ อีกวันมาได้\n\nจัดการตัวเองให้เรียบร้อยก่อนนะ\nเค้ารอเธอมาคุยอยู่ตรงนี้"
  }
];

let state = loadState();

const peekLabel = document.querySelector("#peek-label");
const unlockCopy = document.querySelector("#unlock-copy");
const letterTrack = document.querySelector("#letter-track");
const dayLabel = document.querySelector("#day-label");
const letterTitle = document.querySelector("#letter-title");
const dayToken = document.querySelector("#day-token");
const storyText = document.querySelector("#story-text");
const letterPaper = document.querySelector("#letter-paper");
const letterText = document.querySelector("#letter-text");
const resultText = document.querySelector("#result-text");
const envelopeButton = document.querySelector("#envelope-button");
const letterStage = document.querySelector(".letter-stage");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey) || "{}");
    if (saved.version !== stateVersion) {
      return createInitialState();
    }

    return {
      selectedDay: Number(saved.selectedDay || getCurrentDay()),
      openedDays: saved.openedDays || {},
      version: stateVersion
    };
  } catch {
    return createInitialState();
  }
}

function createInitialState() {
  return {
    selectedDay: getCurrentDay(),
    openedDays: {},
    version: stateVersion
  };
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function resetState() {
  state = createInitialState();
  saveState();
  render();
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getCurrentDay() {
  return clamp(getUnlockedDay() || 1, 1, config.totalDays);
}

function getUnlockedDay() {
  if (config.previewUnlockAllDays) {
    return config.totalDays;
  }

  const now = new Date();
  let unlockedDay = 0;

  for (let day = 1; day <= config.totalDays; day += 1) {
    if (now >= getUnlockDate(day)) {
      unlockedDay = day;
    }
  }

  return unlockedDay;
}

function getUnlockDate(day) {
  const date = new Date(config.startDate);
  date.setDate(config.startDate.getDate() + day - 1);
  date.setHours(config.unlockHour, 0, 0, 0);
  return date;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function formatUnlockDate(date) {
  return `${formatDate(date)} เวลา 20:00 น.`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLetter(day) {
  return letters.find((letter) => letter.day === day) || letters[0];
}

function isUnlocked(day) {
  return config.previewUnlockAllDays || new Date() >= getUnlockDate(day);
}

function isOpened(day) {
  return Boolean(state.openedDays[String(day)]);
}

function openSelectedLetter() {
  if (!isUnlocked(state.selectedDay)) {
    resultText.textContent = `ซองนี้เปิดได้วันที่ ${formatUnlockDate(getUnlockDate(state.selectedDay))}`;
    return;
  }

  state.openedDays[String(state.selectedDay)] = true;
  saveState();
  playOpenEffect();
  render();
}

function playOpenEffect() {
  letterStage.classList.remove("is-opening");
  letterPaper.classList.remove("is-revealing");
  window.setTimeout(() => {
    letterStage.classList.add("is-opening");
    letterPaper.classList.add("is-revealing");
  }, 20);
  window.setTimeout(() => {
    letterStage.classList.remove("is-opening");
    letterPaper.classList.remove("is-revealing");
  }, 1200);
}

function selectDay(day) {
  state.selectedDay = clamp(day, 1, config.totalDays);
  saveState();
  render();
}

function renderTrack() {
  letterTrack.innerHTML = "";

  letters.forEach((letter) => {
    const unlocked = isUnlocked(letter.day);
    const opened = isOpened(letter.day);
    const tile = document.createElement("article");
    tile.className = "letter-tile";
    tile.classList.toggle("is-selected", letter.day === state.selectedDay);
    tile.classList.toggle("is-opened", opened);
    tile.classList.toggle("is-locked", !unlocked);
    tile.innerHTML = `
      <span>Day ${letter.day}</span>
      <strong>${opened ? "เปิดแล้ว" : unlocked ? "เปิดได้" : "20:00"}</strong>
      <button type="button" aria-label="เลือกซอง Day ${letter.day}"></button>
    `;

    tile.querySelector("button").addEventListener("click", () => selectDay(letter.day));
    letterTrack.appendChild(tile);
  });
}

function render() {
  state.selectedDay = clamp(state.selectedDay, 1, config.totalDays);
  const letter = getLetter(state.selectedDay);
  const unlocked = isUnlocked(state.selectedDay);
  const opened = isOpened(state.selectedDay);
  peekLabel.textContent = `DAY ${String(state.selectedDay).padStart(2, "0")}`;
  dayLabel.textContent = `Day ${state.selectedDay}`;
  letterTitle.textContent = letter.title;
  letterTitle.hidden = !letter.title;
  dayToken.textContent = String(state.selectedDay).padStart(2, "0");
  unlockCopy.textContent = "ซองใหม่เปิดทุกวันเวลา 20:00 น.";

  letterStage.classList.toggle("is-opened", opened);
  letterPaper.classList.toggle("is-opened", opened);

  storyText.textContent = unlocked
    ? letter.sealed
    : `ซองนี้ยังล็อกอยู่ เปิดได้วันที่ ${formatUnlockDate(getUnlockDate(state.selectedDay))}`;
  storyText.hidden = unlocked && !letter.sealed;
  letterText.textContent = opened ? letter.text : "ข้อความยังซ่อนอยู่ในซอง";
  letterPaper.setAttribute("aria-label", opened ? `อ่านข้อความ Day ${state.selectedDay}` : `เปิดข้อความ Day ${state.selectedDay}`);
  resultText.textContent = opened
    ? state.selectedDay === 7
      ? "ซองสุดท้ายเปิดแล้ว: เค้ารอเธอมาคุยนะ"
      : "เปิดซองนี้แล้ว เก็บไว้เป็นข้อความเล็กๆ ของวันนี้"
    : unlocked
      ? "ยังไม่ได้เปิดซองนี้"
      : "ยังไม่ถึงวันเปิดซองนี้";

  envelopeButton.disabled = !unlocked;
  renderTrack();
}

envelopeButton.addEventListener("click", openSelectedLetter);
letterPaper.addEventListener("click", openSelectedLetter);
letterPaper.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openSelectedLetter();
  }
});

render();
