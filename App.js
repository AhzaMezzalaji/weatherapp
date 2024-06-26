import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "./src/constant";
import { View, StyleSheet } from "react-native";
import WeatherSearch from "./src/components/weatherSearch";
import WeatherInfo from "./src/components/weatherInfo";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const searchWeather = (location) => {
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        const data = response.data;
        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          visibility: data.visibility,
          windSpeed: data.wind.speed,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {weatherData && <WeatherInfo data={weatherData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default App;
