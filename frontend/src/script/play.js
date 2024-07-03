// adds Youtube iframe api
const tag = document.createElement("script");
tag.id = "iframe-script";
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// loads api constructor
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("audio-player", {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

let timestampTracker;
function onPlayerReady(event) {
  timestampTracker = setInterval(selectLyricsLine, 10);
  // event.target.setPlaybackRate(0.4);
}

function onPlayerStateChange(event) {
  // console.log("time: " + event.target.getCurrentTime());
}

// ****************************** FUNCTIONS ******************************

function selectLyricsLine() {
  let currTime = player.getCurrentTime();
  let lyricsElements = document.getElementById("lyrics-container").children;
  let selectedLine;
  let selectedIndex = -1;

  // gets index of selected line
  for (let i = 0; i < lyricsElements.length; ++i) {
    if (lyricsElements[i].id == "selected") {
      selectedLine = lyricsElements[i];
      selectedIndex = i;
    }
  }

  // sets selected line if none
  if (selectedIndex == -1) {
    selectedLine = lyricsElements[0];
    console.log(lyricsElements[0]);
    selectedLine.classList.remove("hidden");
    selectedLine.id = "selected";
    selectedIndex = 0;
  }

  // stops timestamp tracker if video completed
  if (
    currTime >= player.getDuration() ||
    selectedIndex >= timestamps.length - 1 ||
    selectedIndex >= lyricsElements.length - 1
  ) {
    clearInterval(timestampTracker);
    return;
  }

  // selects next line if timestamp met
  if (currTime >= timestamps[selectedIndex + 1]) {
    selectedLine.classList.add("hidden");
    selectedLine.id = "";

    lyricsElements[selectedIndex + 1].classList.remove("hidden");
    lyricsElements[selectedIndex + 1].id = "selected";
    ++selectedIndex;
  }
}

