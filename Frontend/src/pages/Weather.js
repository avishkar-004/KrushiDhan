import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Weather = () => {
  const [forecast, setForecast] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "99598ffc512d465521c1d8667c56d4cf"; // Replace with your API Key

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        setError("Please enable location services.");
        setLoading(false);
      }
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const dailyForecast = processForecast(response.data.list);
      setForecast(dailyForecast);
    } catch (err) {
      setError("Error fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const processForecast = (list) => {
    const dailyData = {};

    list.forEach((item) => {
      const date = moment(item.dt_txt).format("YYYY-MM-DD");

      if (!dailyData[date]) {
        dailyData[date] = {
          temp: [],
          humidity: [],
          windSpeed: [],
          weather: item.weather[0].main,
          icon: item.weather[0].icon,
          hours: [],
        };
      }

      dailyData[date].temp.push(item.main.temp);
      dailyData[date].humidity.push(item.main.humidity);
      dailyData[date].windSpeed.push(item.wind.speed);
      dailyData[date].hours.push(item);
    });

    return Object.keys(dailyData).slice(0, 5).map((date) => ({
      date,
      avgTemp: (dailyData[date].temp.reduce((a, b) => a + b, 0) / dailyData[date].temp.length).toFixed(1),
      avgHumidity: (dailyData[date].humidity.reduce((a, b) => a + b, 0) / dailyData[date].humidity.length).toFixed(1),
      avgWindSpeed: (dailyData[date].windSpeed.reduce((a, b) => a + b, 0) / dailyData[date].windSpeed.length).toFixed(1),
      weather: dailyData[date].weather,
      icon: dailyData[date].icon,
      hours: dailyData[date].hours,
    }));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day.date === selectedDay ? null : day.date);
    setHourlyData(day.hours);
  };

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>5-Day Weather Forecast</h1>

      {/* Hourly forecast (shown when a day is selected) */}
      {selectedDay && (
        <div style={styles.hourlyContainer}>
          <h2>Hourly Forecast for {moment(selectedDay).format("ddd, MMM D")}</h2>
          <div style={styles.hourlyForecast}>
            {hourlyData.map((hour, index) => (
              <div key={index} style={styles.hourCard}>
                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt={hour.weather[0].main} />
                <p>{hour.weather[0].main}</p>
                <p style={styles.temp}>{hour.main.temp}°C</p>
                <p>{moment(hour.dt_txt).format("HH:mm")}</p>
                <p>💨 {hour.wind.speed} m/s</p>
                <p>💧 {hour.main.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily forecast (click to show hourly) */}
      <div style={styles.forecastContainer}>
        {forecast.map((day, index) => (
          <div key={index} style={styles.card} onClick={() => handleDayClick(day)}>
            <h2>{moment(day.date).format("ddd, MMM D")}</h2>
            <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt={day.weather} />
            <p style={styles.temp}>{day.avgTemp}°C</p>
            <p>{day.weather}</p>
            <p>💧 {day.avgHumidity}%</p>
            <p>💨 {day.avgWindSpeed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styling for a clean UI
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  forecastContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    width: "180px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  temp: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff5722",
  },
  hourlyContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  hourlyForecast: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    padding: "10px",
    whiteSpace: "nowrap",
  },
  hourCard: {
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    minWidth: "100px",
  },
};

export default Weather;
