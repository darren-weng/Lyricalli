// adds Youtube iframe api
const tag = document.createElement("script");
tag.id = "iframe-demo";
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

function onPlayerReady(event) {
  // event.target.setPlaybackRate(0.4);
}

function onPlayerStateChange(event) {
  console.log(event.target.getCurrentTime());
  console.log(event.target.getVideoLoadedFraction());
}
