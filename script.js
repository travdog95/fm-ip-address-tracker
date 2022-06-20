const ipifyApiKey = "at_utXlkLYZ0iGSdT4NnEfTQJtmJgr5G";
const ipifyUrl = "https://geo.ipify.org/api/v1";

//elements
const mapElement = document.querySelector("[data-map]");
const ipAddressElement = document.querySelector("[data-ipAddress");
const locationElement = document.querySelector("[data-location");
const timezoneElement = document.querySelector("[data-timezone");
const ispElement = document.querySelector("[data-isp");

//Get map for current location

const getIpGeolocation = async (address) => {
  const response = await fetch(`${ipifyUrl}`, {
    apiKey: ipifyApiKey,
    ipAddress: address,
  });
  if (!response.ok) {
    throw new Error("Could not fetch location!");
  }
  const location = await response.json();

  return location;
};

getIpGeolocation("https://espn.com");
// $(function () {
//   $.ajax({
//     url: "https://geo.ipify.org/api/v1",
//     data: { apiKey: ipifyApiKey, ipAddress: ip },
//     success: function (data) {
//       $("body").append("<pre>" + JSON.stringify(data, "", 2) + "</pre>");
//     },
//   });
// });
