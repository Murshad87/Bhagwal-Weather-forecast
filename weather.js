// /api/weather.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Get lat/lon from query parameters
  const { lat, lon } = req.query;

  // Bhagwal API key
  const apiKey = "2be72ffaa3b107ec1563e3f0061d687e";

  // OpenWeatherMap One Call API URL
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();

    // Return JSON
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
