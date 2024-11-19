// get id from html
const channels = document.getElementById('channels');

// fetch data
async function getChannels() {
  const response = await fetch(
    'https://api.sr.se/api/v2/channels/?format=json'
  );
  const data = await response.json();

  data.channels.forEach((data) => {
    // create elements
    const radioContainer = document.createElement('div');
    const titleAndLive = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h2');
    const audio = document.createElement('audio');

    // addClasses
    radioContainer.className = 'radioContainer';
    titleAndLive.className = 'titleAndLive';
    title.className = 'title';

    // setAttributes
    audio.src = data.liveaudio.url;
    audio.controls = true;
    audio.type = 'audio/mpeg';
    title.textContent = data.name;

    // style
    titleAndLive.style.backgroundColor = `#${data.color}`;

    img.src = data.image;
    img.alt = data.name;

    // appendChild to parents
    titleAndLive.append(title, audio);
    radioContainer.append(img, titleAndLive);
    channels.appendChild(radioContainer);
  });
}
getChannels();

// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>
