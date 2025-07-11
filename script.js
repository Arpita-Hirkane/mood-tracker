const quotes = {
  Happy: "Celebrate the small wins. 🌟",
  Sad: "It's okay to feel sad. You're not alone.",
  Anxious: "Breathe. You're doing your best. 🧘",
  Angry: "Pause. Respond, don’t react.",
  Tired: "Rest is productive too. 😌"
};

const sounds = {
  Happy: "sounds/happy.mp3",
  Sad: "sounds/sad.mp3",
  Anxious: "sounds/anxious.mp3",
  Angry: "sounds/angry.mp3",
  Tired: "sounds/tired.mp3"
};

function selectMood(mood) {
  document.getElementById("quote-box").classList.remove("hidden");
  document.getElementById("quote-text").innerText = quotes[mood];
  playSound(mood);

  document.getElementById("breathe-section").classList.remove("hidden");

  const entry = {
    mood: mood,
    emoji: getEmoji(mood),
    time: new Date().toLocaleString()
  };

  let logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
  logs.unshift(entry);
  logs = logs.slice(0, 20); // keep max 20 entries
  localStorage.setItem("moodLogs", JSON.stringify(logs));

  showHistory();

  // Breathing text toggle
  let inhale = true;
  const breatheText = document.getElementById("breathe-text");
  clearInterval(window.breatheInterval);
  window.breatheInterval = setInterval(() => {
    breatheText.innerText = inhale ? "Exhale..." : "Inhale...";
    inhale = !inhale;
  }, 3000);
}

function playSound(mood) {
  const audio = document.getElementById("mood-audio");
  if (audio) {
    audio.src = sounds[mood];
    audio.currentTime = 0;
    audio.play();
  }
}

function showHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  const logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
  logs.forEach(log => {
    const li = document.createElement("li");
    li.textContent = `${log.emoji} ${log.mood} - ${log.time}`;
    historyList.appendChild(li);
  });
}

function getEmoji(mood) {
  return {
    Happy: "😊",
    Sad: "😢",
    Anxious: "😟",
    Angry: "😠",
    Tired: "😴"
  }[mood];
}

showHistory();
