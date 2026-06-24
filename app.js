(() => {
  const cases = window.SCRIPTDLE_CASES || [];

  const medicationList = document.getElementById("medication-list");
  const guessForm = document.getElementById("guess-form");
  const guessInput = document.getElementById("guess-input");
  const guessHistory = document.getElementById("guess-history");
  const status = document.getElementById("status");
  const practiceButton = document.getElementById("practice-button");

  const normalize = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, "")
      .replace(/\s+/g, " ");

  const getCaseIndexForDate = () => {
    const dayNumber = Math.floor(Date.now() / 86400000);
    return dayNumber % cases.length;
  };

  let activeCase = null;
  let solved = false;

  const renderCase = (scriptdleCase) => {
    medicationList.innerHTML = "";

    scriptdleCase.medications.forEach((item) => {
      const li = document.createElement("li");
      li.className = "medication-item";
      li.textContent = `${item.name} — ${item.dose}`;
      medicationList.appendChild(li);
    });
  };

  const setStatus = (message) => {
    status.textContent = message;
  };

  const resetRound = (nextCase) => {
    activeCase = nextCase;
    solved = false;
    guessHistory.innerHTML = "";
    guessForm.reset();
    renderCase(activeCase);
    setStatus("");
    guessInput.focus();
  };

  const isCorrectGuess = (guess) => {
    const validAnswers = [activeCase.condition, ...(activeCase.aliases || [])].map(normalize);
    return validAnswers.includes(normalize(guess));
  };

  guessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (solved) {
      return;
    }

    const guess = guessInput.value;
    if (!guess.trim()) {
      return;
    }

    const li = document.createElement("li");
    li.className = "guess-item";

    if (isCorrectGuess(guess)) {
      solved = true;
      li.classList.add("correct");
      li.textContent = `✅ ${guess} (correct)`;
      setStatus(`Correct! The answer was ${activeCase.condition}.`);
    } else {
      li.classList.add("incorrect");
      li.textContent = `❌ ${guess}`;
      setStatus("Not quite. Check doses and med combinations, then try again.");
    }

    guessHistory.prepend(li);
    guessForm.reset();
    guessInput.focus();
  });

  practiceButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * cases.length);
    resetRound(cases[randomIndex]);
    setStatus("Practice mode: new random case loaded.");
  });

  if (cases.length === 0) {
    setStatus("No cases found. Add entries in data.js.");
    practiceButton.disabled = true;
    guessInput.disabled = true;
    return;
  }

  resetRound(cases[getCaseIndexForDate()]);
})();
