// document elements
const charInput = document.getElementById("charInput");
const lyricsContainer = document.getElementById("lyrics-container");
let lyricsElements = lyricsContainer.children;

// checkLyricChanges variables
let currentLyric;
let currentLyricIndex = 0;

// input handler variables
let letterIndex = 0;
let spaceArray = [];
let lyricIndexLength = 0;

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
      // last index of the lyric
      lyricIndexLength = parseInt(
        currentLyric.querySelector("span:last-child").id.slice(6)
      );
      currentLyricIndex++;

      // resets the variables
      letterIndex = 0;
      spaceArray = [-1];
    }

    // removes event listeners when song is finished
    if (currentLyricIndex >= lyricsElements.length) {
      mutationObserver.disconnect();
    }
  }
}

const mutationObserver = new MutationObserver(checkLyricsChanges);
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
    // sets letterindex to the index after the last index so user can backspace
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
    letterIndex++;
  } else {
    // if it's wrong
    currentLetter.classList.add("wrong");
    letterIndex++;
  }
}

function handleBackspace(type) {
  // if the character is a space then remove the space index (will be the previous space index)
  if (
    letterIndex == spaceArray[spaceArray.length - 1] + 1 &&
    spaceArray[spaceArray.length - 1] != -1
  ) {
    spaceArray.pop();
  }

  if (type == "character") {
    // as long as the current letter not the first letter
    if (letterIndex > 0) {
      letterIndex--;

      // previous letter
      currentLyric
        .querySelector("#letter" + letterIndex)
        .classList.remove("wrong", "correct");
    }
  } else {
    // removes the classes from the ctrl backspaced word
    for (let i = letterIndex - 1; i >= spaceArray[spaceArray.length - 1]; i--) {
      if (i < 0) break;
      currentLyric
        .querySelector("#letter" + i)
        .classList.remove("wrong", "correct");
    }
    // plus 1 to get the index after the space
    letterIndex = spaceArray[spaceArray.length - 1] + 1;
  }
}
