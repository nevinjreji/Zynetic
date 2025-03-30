require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Allow CORS for Netlify
app.use(cors({ origin: "https://skymist.netlify.app" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get('/weather', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) return res.status(400).json({ error: 'City is required' });

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        };

        res.json(weatherData);
    } catch (error) {
        console.error('❌ Error fetching weather data:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
