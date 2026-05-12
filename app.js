const config = {
  // Day 1 = 11 May 2026 because 12 May 2026 is Day 2.
  startDate: new Date(2026, 4, 11),
  totalDays: 7,
  unlockHour: 20,
  previewUnlockAllDays: false,
  earlyQuestEnabled: true,
  questLocalTestAllLockedDays: false
};

const stateKey = "blueLettersStateV1";
const stateVersion = 5;

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

const questTypes = {
  water: {
    type: "water",
    badge: "หยด",
    title: "รดน้ำต้นไม้ฟ้า",
    copy: "แตะหยดน้ำให้ต้นไม้ค่อยๆ บาน พอต้นไม้รับน้ำครบ ซองวันนี้จะเปิดให้ก่อนเวลา",
    target: 4
  },
  stars: {
    type: "stars",
    badge: "ดาว",
    title: "เก็บดาวให้สวนฟ้า",
    copy: "แตะเก็บดาวพาสเทลให้ครบ 5 ดวง ดาวจะช่วยเปิดทางให้ซองนี้แบบนุ่มๆ",
    target: 5
  },
  dice: {
    type: "dice",
    badge: "เต๋า",
    title: "ทอยเต๋าบนทางเมฆ",
    copy: "แตะเต๋าให้ตัวหมากเดินไปถึงช่องสุดท้าย เหมือนบอร์ดเกมจิ๋วก่อนเปิดซอง",
    target: 6
  },
  clouds: {
    type: "clouds",
    badge: "เมฆ",
    title: "ต่อทางเมฆ",
    copy: "แตะเมฆที่สว่างอยู่ ไล่ทางไปทีละก้อนจนถึงปลายทาง ซองจะค่อยๆ เปิดทางให้",
    target: 5
  },
  glow: {
    type: "glow",
    badge: "แสง",
    title: "เติมแสงพักใจ",
    copy: "กดค้างที่แสงนุ่มๆ ให้เต็ม เหมือนชาร์จแบตให้สวนฟ้าก่อนเปิดซอง",
    target: 100
  },
  match: {
    type: "match",
    badge: "คู่",
    title: "จับคู่การ์ดสวนฟ้า",
    copy: "เปิดการ์ดให้เจอคู่เหมือนกัน 3 คู่ เป็นบอร์ดเกมจิ๋วแบบเบาๆ",
    target: 6
  },
  finale: {
    type: "finale",
    badge: "รวม",
    title: "รวมแสงเปิดสวน",
    copy: "แตะของจิ๋วทั้ง 4 ชิ้นให้ครบ เหมือนรวมของที่เก็บมาตลอดทางก่อนเปิดซองสุดท้าย",
    target: 4
  }
};

const questPlan = ["water", "stars", "dice", "clouds", "glow", "match", "finale"];
const matchCards = ["✦", "♡", "☁", "♡", "☁", "✦"];
const finaleCharms = ["หยด", "ดาว", "เมฆ", "แสง"];

let state = loadState();
let glowTimer = null;

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
const questPanel = document.querySelector("#quest-panel");
const questTitle = document.querySelector("#quest-title");
const questBadge = document.querySelector("#quest-badge");
const questCopy = document.querySelector("#quest-copy");
const questPlayground = document.querySelector("#quest-playground");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey) || "{}");
    if (saved.version !== stateVersion) {
      return createInitialState();
    }

    return {
      selectedDay: Number(saved.selectedDay || getCurrentDay()),
      openedDays: saved.openedDays || {},
      earlyUnlockedDays: saved.earlyUnlockedDays || {},
      questProgress: saved.questProgress || {},
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
    earlyUnlockedDays: {},
    questProgress: {},
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

function getCalendarDay() {
  const dayMs = 24 * 60 * 60 * 1000;
  const today = startOfDay(new Date());
  const firstDay = startOfDay(config.startDate);

  return clamp(Math.floor((today - firstDay) / dayMs) + 1, 0, config.totalDays);
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
  return isTimeUnlocked(day) || isEarlyUnlocked(day);
}

function isTimeUnlocked(day) {
  return config.previewUnlockAllDays || new Date() >= getUnlockDate(day);
}

function isEarlyUnlocked(day) {
  return Boolean(state.earlyUnlockedDays[String(day)]);
}

function isQuestAvailable(day) {
  if (!config.earlyQuestEnabled || isTimeUnlocked(day) || isEarlyUnlocked(day)) {
    return false;
  }

  if (config.questLocalTestAllLockedDays) {
    return true;
  }

  return day === getCalendarDay() && new Date() < getUnlockDate(day);
}

function isOpened(day) {
  return Boolean(state.openedDays[String(day)]);
}

function getQuest(day) {
  const questType = questPlan[(day - 1) % questPlan.length];
  return questTypes[questType];
}

function getQuestProgress(day) {
  return state.questProgress[String(day)] || {};
}

function setQuestProgress(day, progress) {
  state.questProgress[String(day)] = progress;
  saveState();
}

function openSelectedLetter() {
  if (!isUnlocked(state.selectedDay)) {
    resultText.textContent = isQuestAvailable(state.selectedDay)
      ? "ซองนี้ยังไม่ถึงเวลา แต่สวนฟ้ามีทางลัดเล็กๆ ให้เล่นก่อน"
      : `ซองนี้เปิดได้วันที่ ${formatUnlockDate(getUnlockDate(state.selectedDay))}`;
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

function completeEarlyQuest(day, progress) {
  const key = String(day);
  state.questProgress[key] = { ...progress, completed: true };
  state.earlyUnlockedDays[key] = true;
  saveState();
  render();
  playOpenEffect();
}

function handleWaterQuest(day) {
  const quest = getQuest(day);
  const progress = getQuestProgress(day);
  const water = clamp(Number(progress.water || 0) + 1, 0, quest.target);
  const nextProgress = { ...progress, water };

  if (water >= quest.target) {
    completeEarlyQuest(day, nextProgress);
    return;
  }

  setQuestProgress(day, nextProgress);
  render();
}

function handleStarQuest(day, starIndex) {
  const quest = getQuest(day);
  const progress = getQuestProgress(day);
  const stars = Array.isArray(progress.stars) ? progress.stars : [];

  if (stars.includes(starIndex)) {
    return;
  }

  const nextStars = [...stars, starIndex];
  const nextProgress = { ...progress, stars: nextStars };

  if (nextStars.length >= quest.target) {
    completeEarlyQuest(day, nextProgress);
    return;
  }

  setQuestProgress(day, nextProgress);
  render();
}

function handleDiceQuest(day) {
  const quest = getQuest(day);
  const progress = getQuestProgress(day);
  const roll = Math.floor(Math.random() * 3) + 1;
  const position = clamp(Number(progress.position || 0) + roll, 0, quest.target);
  const nextProgress = { ...progress, roll, position };

  if (position >= quest.target) {
    completeEarlyQuest(day, nextProgress);
    return;
  }

  setQuestProgress(day, nextProgress);
  render();
}

function handleCloudQuest(day, cloudIndex) {
  const quest = getQuest(day);
  const progress = getQuestProgress(day);
  const cloudStep = clamp(Number(progress.cloudStep || 0), 0, quest.target);

  if (cloudIndex !== cloudStep) {
    return;
  }

  const nextProgress = { ...progress, cloudStep: cloudStep + 1 };

  if (nextProgress.cloudStep >= quest.target) {
    completeEarlyQuest(day, nextProgress);
    return;
  }

  setQuestProgress(day, nextProgress);
  render();
}

function updateGlowQuestUI(charge, target) {
  const percent = Math.round((charge / target) * 100);
  const meter = questPlayground.querySelector(".glow-garden .quest-meter");
  const count = questPlayground.querySelector(".glow-garden .quest-count");
  const orb = questPlayground.querySelector(".glow-orb");

  if (meter) {
    meter.style.setProperty("--quest-progress", `${percent}%`);
  }

  if (count) {
    count.textContent = `${percent}%`;
  }

  if (orb) {
    orb.style.setProperty("--glow-scale", String(0.72 + (charge / target) * 0.34));
  }
}

function stopGlowQuest() {
  if (glowTimer) {
    window.clearInterval(glowTimer);
    glowTimer = null;
  }
}

function addGlowCharge(day, amount, shouldRender) {
  const quest = getQuest(day);
  const progress = getQuestProgress(day);
  const charge = clamp(Number(progress.charge || 0) + amount, 0, quest.target);
  const nextProgress = { ...progress, charge };

  state.questProgress[String(day)] = nextProgress;
  saveState();

  if (charge >= quest.target) {
    stopGlowQuest();
    completeEarlyQuest(day, nextProgress);
    return;
  }

  if (shouldRender) {
    render();
    return;
  }

  updateGlowQuestUI(charge, quest.target);
}

function handleGlowStart(day) {
  if (glowTimer) {
    return;
  }

  addGlowCharge(day, 5, false);
  glowTimer = window.setInterval(() => addGlowCharge(day, 7, false), 120);
}

function handleMatchQuest(day, cardIndex) {
  const progress = getQuestProgress(day);
  const matched = Array.isArray(progress.matched) ? progress.matched : [];
  const flipped = Array.isArray(progress.flipped) ? progress.flipped : [];

  if (matched.includes(cardIndex) || flipped.includes(cardIndex) || flipped.length >= 2) {
    return;
  }

  const nextFlipped = [...flipped, cardIndex];

  if (nextFlipped.length === 1) {
    setQuestProgress(day, { ...progress, flipped: nextFlipped });
    render();
    return;
  }

  const [firstCard, secondCard] = nextFlipped;
  const isMatched = matchCards[firstCard] === matchCards[secondCard];
  const nextMatched = isMatched ? [...matched, firstCard, secondCard] : matched;
  const nextProgress = {
    ...progress,
    flipped: isMatched ? [] : nextFlipped,
    matched: nextMatched
  };

  if (nextMatched.length >= getQuest(day).target) {
    completeEarlyQuest(day, nextProgress);
    return;
  }

  setQuestProgress(day, nextProgress);
  render();

  if (!isMatched) {
    window.setTimeout(() => {
      const latestProgress = getQuestProgress(day);
      const latestFlipped = Array.isArray(latestProgress.flipped) ? latestProgress.flipped : [];
      const isSamePair = latestFlipped.length === 2 && latestFlipped.every((item, index) => item === nextFlipped[index]);

      if (isSamePair) {
        setQuestProgress(day, { ...latestProgress, flipped: [] });
        render();
      }
    }, 650);
  }
}

function handleFinaleQuest(day, charmIndex) {
  const quest = getQuest(day);
  const progress = getQuestProgress(day);
  const charms = Array.isArray(progress.charms) ? progress.charms : [];

  if (charms.includes(charmIndex)) {
    return;
  }

  const nextCharms = [...charms, charmIndex];
  const nextProgress = { ...progress, charms: nextCharms };

  if (nextCharms.length >= quest.target) {
    completeEarlyQuest(day, nextProgress);
    return;
  }

  setQuestProgress(day, nextProgress);
  render();
}

function renderQuest() {
  const day = state.selectedDay;
  const quest = getQuest(day);
  const progress = getQuestProgress(day);

  questPanel.hidden = !isQuestAvailable(day);

  if (questPanel.hidden) {
    stopGlowQuest();
    questPlayground.innerHTML = "";
    return;
  }

  if (quest.type !== "glow") {
    stopGlowQuest();
  }

  questTitle.textContent = quest.title;
  questBadge.textContent = quest.badge;
  questCopy.textContent = quest.copy;

  if (quest.type === "water") {
    renderWaterQuest(day, quest, progress);
  }

  if (quest.type === "stars") {
    renderStarQuest(day, quest, progress);
  }

  if (quest.type === "dice") {
    renderDiceQuest(day, quest, progress);
  }

  if (quest.type === "clouds") {
    renderCloudQuest(day, quest, progress);
  }

  if (quest.type === "glow") {
    renderGlowQuest(day, quest, progress);
  }

  if (quest.type === "match") {
    renderMatchQuest(day, quest, progress);
  }

  if (quest.type === "finale") {
    renderFinaleQuest(day, quest, progress);
  }
}

function renderWaterQuest(day, quest, progress) {
  const water = clamp(Number(progress.water || 0), 0, quest.target);
  const percent = Math.round((water / quest.target) * 100);

  questPlayground.innerHTML = `
    <div class="sky-garden water-garden">
      <div class="plant-visual growth-${water}" aria-hidden="true">
        <span class="plant-pot"></span>
        <span class="plant-stem"></span>
        <span class="plant-leaf plant-leaf-left"></span>
        <span class="plant-leaf plant-leaf-right"></span>
        <span class="plant-bloom"></span>
      </div>
      <button class="droplet-button" type="button" aria-label="รดน้ำต้นไม้ฟ้า">
        <span class="droplet-shape"></span>
      </button>
      <div class="quest-meter" style="--quest-progress: ${percent}%">
        <span></span>
      </div>
      <p class="quest-count">${water}/${quest.target}</p>
    </div>
  `;

  questPlayground.querySelector(".droplet-button").addEventListener("click", () => handleWaterQuest(day));
}

function renderStarQuest(day, quest, progress) {
  const stars = Array.isArray(progress.stars) ? progress.stars : [];
  const buttons = Array.from({ length: quest.target }, (_, index) => {
    const collected = stars.includes(index);
    return `
      <button class="star-button ${collected ? "is-collected" : ""}" type="button" data-star="${index}" ${collected ? "disabled" : ""} aria-label="เก็บดาวดวงที่ ${index + 1}">
        ★
      </button>
    `;
  }).join("");

  questPlayground.innerHTML = `
    <div class="sky-garden star-garden">
      <div class="star-field">${buttons}</div>
      <div class="quest-meter" style="--quest-progress: ${Math.round((stars.length / quest.target) * 100)}%">
        <span></span>
      </div>
      <p class="quest-count">${stars.length}/${quest.target}</p>
    </div>
  `;

  questPlayground.querySelectorAll(".star-button").forEach((button) => {
    button.addEventListener("click", () => handleStarQuest(day, Number(button.dataset.star)));
  });
}

function renderDiceQuest(day, quest, progress) {
  const position = clamp(Number(progress.position || 0), 0, quest.target);
  const roll = Number(progress.roll || 0);
  const diceFaces = ["?", "⚀", "⚁", "⚂"];
  const cells = Array.from({ length: quest.target + 1 }, (_, index) => `
    <span class="board-cell ${index === position ? "is-player" : ""} ${index === quest.target ? "is-finish" : ""}">
      ${index === quest.target ? "♡" : ""}
    </span>
  `).join("");

  questPlayground.innerHTML = `
    <div class="sky-garden dice-garden">
      <div class="cloud-board" aria-hidden="true">${cells}</div>
      <button class="dice-button" type="button" aria-label="ทอยเต๋า">
        <span>${diceFaces[roll]}</span>
      </button>
      <div class="quest-meter" style="--quest-progress: ${Math.round((position / quest.target) * 100)}%">
        <span></span>
      </div>
      <p class="quest-count">${position}/${quest.target}</p>
    </div>
  `;

  questPlayground.querySelector(".dice-button").addEventListener("click", () => handleDiceQuest(day));
}

function renderCloudQuest(day, quest, progress) {
  const cloudStep = clamp(Number(progress.cloudStep || 0), 0, quest.target);
  const clouds = Array.from({ length: quest.target }, (_, index) => `
    <button class="cloud-button ${index < cloudStep ? "is-done" : ""} ${index === cloudStep ? "is-active" : ""}" type="button" data-cloud="${index}" aria-label="แตะเมฆก้อนที่ ${index + 1}">
      ${index + 1}
    </button>
  `).join("");

  questPlayground.innerHTML = `
    <div class="sky-garden cloud-garden">
      <div class="cloud-path">${clouds}</div>
      <div class="quest-meter" style="--quest-progress: ${Math.round((cloudStep / quest.target) * 100)}%">
        <span></span>
      </div>
      <p class="quest-count">${cloudStep}/${quest.target}</p>
    </div>
  `;

  questPlayground.querySelectorAll(".cloud-button").forEach((button) => {
    button.addEventListener("click", () => handleCloudQuest(day, Number(button.dataset.cloud)));
  });
}

function renderGlowQuest(day, quest, progress) {
  const charge = clamp(Number(progress.charge || 0), 0, quest.target);
  const percent = Math.round((charge / quest.target) * 100);

  questPlayground.innerHTML = `
    <div class="sky-garden glow-garden">
      <div class="glow-orb-wrap" aria-hidden="true">
        <span class="glow-orb" style="--glow-scale: ${0.72 + (charge / quest.target) * 0.34}"></span>
      </div>
      <button class="glow-button" type="button" aria-label="กดค้างเพื่อเติมแสง">
        กดค้าง
      </button>
      <div class="quest-meter" style="--quest-progress: ${percent}%">
        <span></span>
      </div>
      <p class="quest-count">${percent}%</p>
    </div>
  `;

  const glowButton = questPlayground.querySelector(".glow-button");
  glowButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    glowButton.setPointerCapture(event.pointerId);
    handleGlowStart(day);
  });
  glowButton.addEventListener("pointerup", stopGlowQuest);
  glowButton.addEventListener("pointercancel", stopGlowQuest);
  glowButton.addEventListener("pointerleave", stopGlowQuest);
  glowButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      addGlowCharge(day, 16, true);
    }
  });
}

function renderMatchQuest(day, quest, progress) {
  const matched = Array.isArray(progress.matched) ? progress.matched : [];
  const flipped = Array.isArray(progress.flipped) ? progress.flipped : [];
  const cards = matchCards.map((symbol, index) => {
    const visible = matched.includes(index) || flipped.includes(index);
    return `
      <button class="match-card ${visible ? "is-flipped" : ""} ${matched.includes(index) ? "is-matched" : ""}" type="button" data-card="${index}" ${matched.includes(index) ? "disabled" : ""} aria-label="เปิดการ์ดใบที่ ${index + 1}">
        ${visible ? symbol : "?"}
      </button>
    `;
  }).join("");

  questPlayground.innerHTML = `
    <div class="sky-garden match-garden">
      <div class="match-grid">${cards}</div>
      <div class="quest-meter" style="--quest-progress: ${Math.round((matched.length / quest.target) * 100)}%">
        <span></span>
      </div>
      <p class="quest-count">${matched.length}/${quest.target}</p>
    </div>
  `;

  questPlayground.querySelectorAll(".match-card").forEach((button) => {
    button.addEventListener("click", () => handleMatchQuest(day, Number(button.dataset.card)));
  });
}

function renderFinaleQuest(day, quest, progress) {
  const charms = Array.isArray(progress.charms) ? progress.charms : [];
  const buttons = finaleCharms.map((label, index) => `
    <button class="charm-button ${charms.includes(index) ? "is-collected" : ""}" type="button" data-charm="${index}" ${charms.includes(index) ? "disabled" : ""} aria-label="เก็บ${label}">
      <span>${label}</span>
    </button>
  `).join("");

  questPlayground.innerHTML = `
    <div class="sky-garden finale-garden">
      <div class="finale-circle">${buttons}</div>
      <div class="quest-meter" style="--quest-progress: ${Math.round((charms.length / quest.target) * 100)}%">
        <span></span>
      </div>
      <p class="quest-count">${charms.length}/${quest.target}</p>
    </div>
  `;

  questPlayground.querySelectorAll(".charm-button").forEach((button) => {
    button.addEventListener("click", () => handleFinaleQuest(day, Number(button.dataset.charm)));
  });
}

function renderTrack() {
  letterTrack.innerHTML = "";

  letters.forEach((letter) => {
    const unlocked = isUnlocked(letter.day);
    const opened = isOpened(letter.day);
    const questAvailable = isQuestAvailable(letter.day);
    const tile = document.createElement("article");
    tile.className = "letter-tile";
    tile.classList.toggle("is-selected", letter.day === state.selectedDay);
    tile.classList.toggle("is-opened", opened);
    tile.classList.toggle("is-locked", !unlocked);
    tile.innerHTML = `
      <span>Day ${letter.day}</span>
      <strong>${opened ? "เปิดแล้ว" : unlocked ? "เปิดได้" : questAvailable ? "สวนฟ้า" : "20:00"}</strong>
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
  const earlyUnlocked = isEarlyUnlocked(state.selectedDay);
  const questAvailable = isQuestAvailable(state.selectedDay);
  const opened = isOpened(state.selectedDay);
  peekLabel.textContent = `DAY ${String(state.selectedDay).padStart(2, "0")}`;
  dayLabel.textContent = `Day ${state.selectedDay}`;
  letterTitle.textContent = letter.title;
  letterTitle.hidden = !letter.title;
  dayToken.textContent = String(state.selectedDay).padStart(2, "0");
  unlockCopy.textContent = "ซองใหม่เปิดทุกวันเวลา 20:00 น.";

  letterStage.classList.toggle("is-opened", opened);
  letterPaper.classList.toggle("is-opened", opened);
  letterPaper.classList.toggle("is-locked", !unlocked);

  storyText.textContent = unlocked
    ? letter.sealed
    : questAvailable
      ? "ยังไม่ถึงเวลา 20:00 แต่สวนฟ้ามีทางลัดเล็กๆ ให้เล่นก่อน"
    : `ซองนี้ยังล็อกอยู่ เปิดได้วันที่ ${formatUnlockDate(getUnlockDate(state.selectedDay))}`;
  storyText.hidden = unlocked && !letter.sealed;
  letterText.textContent = opened
    ? letter.text
    : unlocked
      ? "ข้อความยังซ่อนอยู่ในซอง"
      : "ซองนี้ยังพักอยู่ในสวนฟ้า";
  letterPaper.dataset.hint = opened
    ? ""
    : unlocked
      ? "แตะเพื่อเปิดอ่าน"
      : questAvailable
        ? "เล่นสวนฟ้าก่อน ถ้าอยากเปิดก่อนเวลา"
        : "รอเวลา 20:00 น.";
  letterPaper.setAttribute("aria-label", opened ? `อ่านข้อความ Day ${state.selectedDay}` : `เปิดข้อความ Day ${state.selectedDay}`);
  resultText.textContent = opened
    ? state.selectedDay === 7
      ? "ซองสุดท้ายเปิดแล้ว: เค้ารอเธอมาคุยนะ"
      : "เปิดซองนี้แล้ว เก็บไว้เป็นข้อความเล็กๆ ของวันนี้"
    : earlyUnlocked
      ? "สวนฟ้าเปิดทางให้แล้ว แตะซองเพื่ออ่านได้เลย"
    : unlocked
      ? "ยังไม่ได้เปิดซองนี้"
      : questAvailable
        ? "เล่นภารกิจจิ๋วเพื่อเปิดก่อนเวลา หรือรอถึง 20:00 น."
        : "ยังไม่ถึงวันเปิดซองนี้";

  envelopeButton.disabled = !unlocked;
  renderQuest();
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
