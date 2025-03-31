const channels = document.getElementById("channels");
const searchInput = document.getElementById("search");
let allChannels = [];

// Fetch data
async function getChannels() {
  try {
    const response = await fetch(
      "http://api.sr.se/api/v2/channels?format=json&size=100"
    );
    if (!response.ok) throw new Error("Något gick fel med API-förfrågan");
    const data = await response.json();
    allChannels = data.channels;
    renderChannels(allChannels);
  } catch (error) {
    console.error("Fel vid hämtning av kanaler:", error);
  }
}

// Render channels
function renderChannels(filteredChannels) {
  channels.innerHTML = "";
  filteredChannels.forEach((data) => {
    // Create elements
    const radioContainer = document.createElement("div");
    const titleAndLive = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const audio = document.createElement("audio");

    // Add classes
    radioContainer.className = "radioContainer";
    titleAndLive.className = "titleAndLive";
    title.className = "title";

    // Set attributes
    audio.src = data.liveaudio.url;
    audio.controls = true;
    audio.type = "audio/mpeg";
    title.textContent = data.name;
    img.src = data.image;
    img.alt = data.name;

    // Style
    titleAndLive.style.backgroundColor = `#${data.color}`;

    // Append elements
    titleAndLive.append(title, audio);
    radioContainer.append(img, titleAndLive);
    channels.appendChild(radioContainer);
  });
}

// Search functionality
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredChannels = allChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm)
  );
  renderChannels(filteredChannels);
});

// Initialize
getChannels();
