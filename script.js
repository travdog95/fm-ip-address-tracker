const ipifyApiKey = "at_utXlkLYZ0iGSdT4NnEfTQJtmJgr5G";
const ipifyUrl = "https://geo.ipify.org/api/v1";
const testAddress = "13.249.205.48";

//elements
const mapContainer = document.querySelector("[data-map-container]");
const ipAddressElement = document.querySelector("[data-ipAddress]");
const locationElement = document.querySelector("[data-location]");
const timezoneElement = document.querySelector("[data-timezone]");
const ispElement = document.querySelector("[data-isp]");
const searchButton = document.querySelector(".icon-container");
const searchInput = document.querySelector("[data-search-input]");
const messageElement = document.querySelector("[data-message]");

//Event handlers
searchButton.addEventListener("click", function (e) {
  if (!validSearchInput(searchInput.value)) return;

  searchHandler(searchInput.value);
});

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (!validSearchInput(searchInput.value)) return;

    searchHandler(searchInput.value);
  }
});

const validSearchInput = (searchValue) => {
  if (searchValue == "") return false;

  return true;
};

const searchHandler = (searchValue) => {
  messageElement.innerHTML = "Retrieving map info...";

  getIpGeolocation(searchValue)
    .then((locData) => {
      messageElement.innerHTML = "";
      mapContainer.innerHTML = `<div id="map" class="map"></div>`;

      //Map
      const map = L.map("map").setView([locData.location.lat, locData.location.lng], 13);

      //Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      //Custom icon
      const myIcon = L.icon({
        iconUrl: "./images/icon-location.svg",
      });

      //Marker
      L.marker([locData.location.lat, locData.location.lng], { icon: myIcon }).addTo(map);

      //Set location details
      ipAddressElement.innerHTML = locData.ip;
      locationElement.innerHTML = `${locData.location.city}, ${locData.location.region} ${locData.location.postalCode}`;
      timezoneElement.innerHTML = `UTC ${locData.location.timezone}`;
      ispElement.innerHTML = locData.isp;
    })
    .catch((error) => {
      console.log(error);
      messageElement.innerHTML = error;
    });
};

//Get map for current location
const getIpGeolocation = async (address) => {
  const response = await fetch(`${ipifyUrl}?apiKey=${ipifyApiKey}&ipAddress=${address}`);

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(errors.messages);
  }

  const location = await response.json();

  return location;
};
