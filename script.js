async function getWeather(searchTerm) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?key=B4JF83Z5AJ2FAK5FQMMPFMSJE`,
      { mode: "cors" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function processWeatherData(weatherData) {
  let resolvedAddress = weatherData.resolvedAddress;
  let temperature = weatherData.currentConditions.temp;
  let conditions = weatherData.currentConditions.conditions;

  return { resolvedAddress, temperature, conditions };
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const addressDiv = document.getElementById("resolvedAddress");
const temperatureDiv = document.getElementById("temperatureDiv");
const conditionsDiv = document.getElementById("conditionsDiv");

searchBtn.addEventListener("click", async () => {
  const term = searchInput.value;
  if (term) {
    const weatherData = await getWeather(term);
    if (weatherData) {
      addressDiv.innerText = weatherData.resolvedAddress;
      if (tempUnit) {
        temperatureDiv.innerText = weatherData.temperature.toFixed(1);
      } else if (!tempUnit) {
        temperatureDiv.innerText = (
          (weatherData.temperature - 32) /
          (9 / 5)
        ).toFixed(1);
      }
      conditionsDiv.innerText = weatherData.conditions;
    }
  } else {
    console.error("Please Enter a Valid Location");
  }
});

const temperatureButton = document.getElementById("tempBtn");
const fahrenheitText = document.getElementById("fahrenheit");
const celciusText = document.getElementById("celcius");
let tempUnit = true;

temperatureButton.addEventListener("click", () => {
  if (tempUnit) {
    temperatureDiv.innerText = (
      (parseFloat(temperatureDiv.innerText) - 32) /
      (9 / 5)
    ).toFixed(1);
    fahrenheitText.style.fontWeight = "normal";
    celciusText.style.fontWeight = "bold";
    tempUnit = false;
  } else if (!tempUnit) {
    temperatureDiv.innerText = (
      parseFloat(temperatureDiv.innerText * (9 / 5)) + 32
    ).toFixed(1);
    fahrenheitText.style.fontWeight = "bold";
    celciusText.style.fontWeight = "normal";
    tempUnit = true;
  }
});
