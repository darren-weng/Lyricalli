// document elements
const charInput = document.getElementById("charInput");
const lyricsContainer = document.getElementById("lyrics-container");
const comboCounter = document.getElementById("comboCounter");
const totalPointsOutput = document.getElementById("totalPointsOutput");
const accuracyOutput = document.getElementById("accuracyOutput");
let lyricsElements = lyricsContainer.children;

// checkLyricChanges variables
const mutationObserver = new MutationObserver(checkLyricsChanges);
let currentLyric;
let currentLyricIndex = 0;

// input handler variables
let letterIndex = 1;
let spaceArray = [0];
let lyricIndexLength = 0;
let totalCharacters = 0;
let mistakes = 0;

let comboArray = [0];
let highestLetterIndex = 0;
let totalPoints = 0;
let accuracy;

// .has is more efficient than .includes so a a set is needed
const functionKeys = new Set([
  "Shift",
  "Alt",
  "Meta",
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "CapsLock",
  "Tab",
  "Enter",
  "Control",
]);

// function for element id change event
function checkLyricsChanges(mutationsList) {
  let mutation = mutationsList[0];

  if (mutation.attributeName === "id") {
    if (currentLyricIndex < lyricsElements.length) {
      currentLyric = lyricsElements[currentLyricIndex];

      // adds the letters that were missed to mistakes
      letterIndex == lyricIndexLength + 1 ? letterIndex-- : letterIndex;
      if (lyricIndexLength - letterIndex > 0) comboReset();
      mistakes += lyricIndexLength - letterIndex;

      // last index of the lyric
      lyricIndexLength = parseInt(
        currentLyric.querySelector("span:last-child").id.slice(6)
      );
      totalCharacters += lyricIndexLength;
      updateAccuracy();
      currentLyricIndex++;

      // resets the variables
      letterIndex = 1;
      spaceArray = [0];
      highestLetterIndex = 0;
    }

    // removes event listeners when song is finished
    if (currentLyricIndex >= lyricsElements.length) {
      mutationObserver.disconnect();
    }
  }
}

mutationObserver.observe(lyricsContainer, {
  attributes: true,
  subtree: true,
  attributeFilter: ["id"],
});

charInput.addEventListener("keydown", inputHandler);

//* start of input handler
function inputHandler(event) {
  let currentLetter;
  let trimmedContent;

  // function keys make input and mess up the typing
  if (functionKeys.has(event.key)) return;
  if (letterIndex > lyricIndexLength) {
    // sets letter index to the index after the last index so user can backspace
    // only allows backspaces once done typing with the lyric (backspace removes the previous element)
    if (event.key == "Backspace") letterIndex == lyricIndexLength + 1;
    else return;
  }

  // only generate current letter when letter index is in bounds
  // at the end of the lyric you can backspace
  if (letterIndex <= lyricIndexLength) {
    currentLetter = currentLyric.querySelector("#letter" + letterIndex);
    trimmedContent = currentLetter.textContent.trim();

    //* spans have white space around the text content. need to trim it (also trims space characters)
    trimmedContent == ""
      ? (currentLetter.textContent = " ")
      : (currentLetter.textContent = trimmedContent);
  }
  // handles word deletion (ctrl + backspace)
  if (
    (event.metaKey || event.altKey || event.ctrlKey) &&
    event.key == "Backspace"
  ) {
    handleBackspace("word");
    return;
  } else if (event.key == "Backspace") {
    handleBackspace("character");
  } else if (event.key == currentLetter.textContent) {
    if (currentLetter.textContent == " ") {
      spaceArray.push(parseInt(currentLetter.id.slice(6)));
    }
    currentLetter.classList.add("correct");

    highestLetterIndex < letterIndex
      ? (highestLetterIndex = letterIndex)
      : highestLetterIndex;

    letterIndex++;
    pointsCalc();
  } else {
    // if it's wrong
    currentLetter.classList.add("wrong");
    letterIndex++;
    mistakes++;

    updateAccuracy();
    comboReset();
  }
}

function comboReset() {
  if (comboArray[comboArray.length - 1] != 0) {
    comboArray.push(0);
  }

  comboCounter.innerHTML = "combo: " + comboArray[comboArray.length - 1];
}

function pointsCalc() {
  updateAccuracy();

  if (letterIndex > highestLetterIndex) {
    comboArray[comboArray.length - 1]++;
    totalPoints += accuracy * (300 * (comboArray[comboArray.length - 1] / 88));
  }

  comboCounter.innerHTML = "combo: " + comboArray[comboArray.length - 1];
  totalPointsOutput.innerHTML = "points: " + Math.round(totalPoints);

  // prevents point farming on the last letter
  if (letterIndex == lyricIndexLength + 1) highestLetterIndex = letterIndex;
}

function handleBackspace(type) {
  // if the character is a space then remove the space index (will be the previous space index)
  if (
    letterIndex == spaceArray[spaceArray.length - 1] + 1 &&
    spaceArray[spaceArray.length - 1] != 0
  ) {
    spaceArray.pop();
  }

  if (type == "character") {
    // as long as the current letter not the first letter
    if (letterIndex > 1) {
      letterIndex--;
      currentLetter = currentLyric.querySelector("#letter" + letterIndex);

      if (currentLetter.classList.contains("wrong")) mistakes--;
      updateAccuracy();
      currentLetter.classList.remove("wrong", "correct");
    }
  } else {
    // removes the classes from the ctrl backspaced word
    for (let i = letterIndex - 1; i >= spaceArray[spaceArray.length - 1]; i--) {
      if (i < 1) break;
      currentLetter = currentLyric.querySelector("#letter" + i);

      if (currentLetter.classList.contains("wrong")) mistakes--;
      currentLetter.classList.remove("wrong", "correct");
    }
    // plus 1 to get the index after the space
    letterIndex = spaceArray[spaceArray.length - 1] + 1;
    updateAccuracy();
  }
  // reset combo on any backspace
  comboReset();
}

function updateAccuracy() {
  accuracy = (totalCharacters - mistakes) / totalCharacters;
  accuracyOutput.innerHTML = "accuracy " + Math.round(accuracy * 100) + "%";
}
