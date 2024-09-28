export const getWeatherImage = (weatherMain: string) => {
  switch (weatherMain) {
    case "Clear":
      return "clear.png";
    case "Clouds":
      return "cloud.png";
    case "Rain":
      return "rain.png";
    case "Snow":
      return "snow.png";
    case "Thunderstorm":
      return "thunderstorm.png";
    case "Drizzle":
      return "drizzle.png";
    case "Mist":
    case "Fog":
      return "mist.png";
    default:
      return "cloud.png";
  }
};
