require('dotenv').config();
const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";

let DATA = {
  name: "Muhammad",
  date: new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "America/Winnipeg",
  }),
};

async function setWeatherInformation() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
  )
    .then(r => r.json())
    .then(r => {
      if (r.main && r.main.temp !== undefined) {
        DATA.city_temperature = Math.round(r.main.temp);
      } else {
        // Handle the case where the expected data is not available
        console.error("Error: Unable to retrieve temperature information from the API response.");
        return;
      }

      if (r.weather && r.weather.length > 0) {
        DATA.city_weather = r.weather[0].description;
        DATA.city_weather_icon = r.weather[0].icon;
      } else {
        // Handle the case where the weather information is not available
        console.error("Error: Unable to retrieve weather information from the API response.");
        return;
      }

      if (r.sys && r.sys.sunrise && r.sys.sunset) {
        DATA.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Winnipeg',
        });
        DATA.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Winnipeg',
        });
      } else {
        // Handle the case where sunrise/sunset information is not available
        console.error("Error: Unable to retrieve sunrise/sunset information from the API response.");
        return;
      }
    })
    .catch(error => {
      console.error("Error fetching weather information:", error.message);
    });
}async function setWeatherInformation() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=winnipeg&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
  )
    .then(r => r.json())
    .then(r => {
      if (r.main && r.main.temp !== undefined) {
        DATA.city_temperature = Math.round(r.main.temp);
      } else {
        // Handle the case where the expected data is not available
        console.error("Error: Unable to retrieve temperature information from the API response.");
        return;
      }

      if (r.weather && r.weather.length > 0) {
        DATA.city_weather = r.weather[0].description;
        DATA.city_weather_icon = r.weather[0].icon;
      } else {
        // Handle the case where the weather information is not available
        console.error("Error: Unable to retrieve weather information from the API response.");
        return;
      }

      if (r.sys && r.sys.sunrise && r.sys.sunset) {
        DATA.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Winnipeg',
        });
        DATA.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Winnipeg',
        });
      } else {
        // Handle the case where sunrise/sunset information is not available
        console.error("Error: Unable to retrieve sunrise/sunset information from the API response.");
        return;
      }
    })
    .catch(error => {
      console.error("Error fetching weather information:", error.message);
    });
}

function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync("README.md", output);
  });
}

async function action() {
  /**
   * Fetch Weather
   */
  await setWeatherInformation();

  /**
   * Generate README
   */
  await generateReadMe();
}

action();
