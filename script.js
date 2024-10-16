async function getWeather() {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=B4JF83Z5AJ2FAK5FQMMPFMSJE",
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data)
}
getWeather()