var success;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      success = true;

      sendData(latitude, longitude);
    },
    function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
        default:
          console.error("An unknown error occurred.");
          break;
      }
    }
  );
}

function sendData(latitude, longitude) {
  const values = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ latitude, longitude }),
  };

  if (success) {
    fetch("/weather", values)
      .then((response) => {
        if (!response.ok) {
          console.log("error");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        addData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

var addData = function (weather_info) {
  let city = document.querySelector(".city-name");
  let city_weather_text = document.querySelector(".city-weather-text");
  let wind_speed = document.querySelector(".wind-speed");
  let percipitation = document.querySelector(".percipitation");
  let sunrise = document.querySelector(".sunrise");
  let html_parent = document.querySelector(".hourly-wrapper");
  let city_temp = document.querySelector(".city-temp");
  let city_temp_img = document.querySelector(".city-temp-img");

  let timming = {
    0: "12:00 Am",
    1: "1:00 Am",
    2: "2:00 Am",
    3: "3:00 Am",
    4: "4:00 Am",
    5: "5:00 Am",
    6: "6:00 Am",
    7: "7:00 Am",
    8: "8:00 Am",
    9: "9:00 Am",
    10: "10:00 Am",
    11: "11:00 Am",
    12: "12:00 Pm",
    13: "1:00 Pm",
    14: "2:00 Pm",
    15: "3:00 Pm",
    16: "4:00 Pm",
    17: "5:00 Pm",
    18: "6:00 Pm",
    19: "7:00 Pm",
    20: "7:00 Pm",
    21: "9:00 Pm",
    22: "10:00 Pm",
    23: "11:00 Pm",
  };

  let current_time = new Date().getHours();

  city_temp_img.src = weather_info.img_path;
  city.innerHTML = weather_info.location + ", " + weather_info.region;
  city_weather_text.innerHTML = weather_info.text;
  wind_speed.innerHTML = weather_info.wind_speed + " km/h";
  percipitation.innerHTML = weather_info.percipitation + "%";
  sunrise.innerHTML = weather_info.sunrise;
  city_temp.innerHTML = weather_info.weather + "°c";
  let keys = Object.keys(weather_info.hour);

  let iteration = 0;
  for (let key of keys) {
    if (current_time <= key) {
      let time = timming[key];
      let temp = weather_info.hour[key][0];
      let temp_img = weather_info.hour[key][1];

      if (iteration === 0) {
        iteration++;
        html_parent.innerHTML = `<div class="card inline-block snap-center">
      <div class="flex flex-col items-center">
        <img src="${temp_img}" alt="" class="w-20" />
        <h2>Now</h2>
        <h1 class="text-xl font-mono md:text-2xl">${temp}°c</h1>
      </div>`;
      } else {
        html_parent.innerHTML += `<div class="card inline-block snap-center">
      <div class="flex flex-col items-center">
        <img src="${temp_img}" alt="" class="w-20" />
        <h2>${time}</h2>
        <h1 class="text-xl font-mono md:text-2xl">${temp}°c</h1>
      </div>`;
      }
    }
  }

  loader.style.display = "none";
  content.style.display = "block";
};
