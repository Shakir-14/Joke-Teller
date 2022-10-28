const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
// passing joke to voiceRSS API
function tellMe(joke) {
  //   console.log("tell me", joke);
  VoiceRSS.speech({
    key: "8047c125af6a4aa4bd783eddbbfc8740",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
// Get Jokes from Jolke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    //
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data.joke);
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-To-Speech
    tellMe(joke);
    //Disable Button
    toggleButton();
  } catch (error) {
    // catch errors
    console.log("Whoops", error);
  }
}
//Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
