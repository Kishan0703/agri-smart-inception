import axios from "axios";
import { cropKnowledgeBase } from "../data/cropKnowledgeBase.js";
import AdvisoryHistory from "../models/advisoryHistoryModel.js";


// ---------------------------------------
// FETCH WEATHER DATA FROM OPENWEATHER
// ---------------------------------------
const getOpenWeatherData = async (location) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // If location looks like coordinates (lat, lon), use lat/lon query params
  const coordMatch = location
    ? location.trim().match(/^\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*$/)
    : null;

  const url = coordMatch
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${coordMatch[1]}&lon=${coordMatch[2]}&units=metric&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        location
      )}&units=metric&appid=${apiKey}`;

  const { data } = await axios.get(url);
  return data;
};


// ---------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------
const monthInList = (month, arr) => arr && arr.includes(month);

const waterMatchScore = (waterReq, totalRain) => {
  if (waterReq === "high") {
    if (totalRain >= 120) return 10;
    if (totalRain >= 80) return 7;
    return 3;
  }

  if (waterReq === "medium") {
    if (totalRain >= 60 && totalRain <= 150) return 10;
    if (totalRain >= 40 && totalRain <= 200) return 7;
    return 4;
  }

  // LOW water requirement
  if (totalRain <= 80) return 10;
  if (totalRain <= 150) return 7;
  return 3;
};


// ---------------------------------------
// AI LEVEL-2 CROP SCORING ENGINE
// ---------------------------------------
const scoreCrops = (forecastData, soilType = "loam", sowingMonth = null) => {
  const list = forecastData.list || [];
  if (!list.length) {
    return { crops: [], reasoning: "No forecast data available" };
  }

  let tempSum = 0;
  let humiditySum = 0;
  let rainSum = 0;
  let count = 0;

  list.forEach((entry) => {
    if (entry.main) {
      tempSum += entry.main.temp || 0;
      humiditySum += entry.main.humidity || 0;
      count++;
    }
    if (entry.rain) rainSum += entry.rain["3h"] || 0;
  });

  const avgTemp = tempSum / count;
  const avgHumidity = humiditySum / count;
  const totalRain = rainSum;
  const month = sowingMonth || new Date().getMonth() + 1;

  // Weather summary
  const summary = `
Climate Summary:
🌡 Temp: ${avgTemp.toFixed(1)}°C
💧 Humidity: ${avgHumidity.toFixed(1)}%
🌧 Total Rainfall (5 days): ${totalRain.toFixed(1)} mm
Soil Type: ${soilType}
Sowing Month Considered: ${month}
`;


  // -------------------------------
  // SCORE EACH CROP
  // -------------------------------
  const scoredCrops = cropKnowledgeBase.map((crop) => {
    let score = 0;
    const breakdown = [];

    // 🎯 Temperature Score (0–30)
    const idealTempMid = (crop.idealTemp[0] + crop.idealTemp[1]) / 2;
    const tempDiff = Math.abs(avgTemp - idealTempMid);
    const tempScore = Math.max(0, 30 - tempDiff * 2);
    score += tempScore;
    breakdown.push(`Temp Fit: ${tempScore.toFixed(1)}/30`);

    // 🎯 Rainfall Score (0–20)
    const idealRainMid = (crop.idealRain[0] + crop.idealRain[1]) / 2;
    const rainDiff = Math.abs(totalRain - idealRainMid);
    const rainScore = Math.max(0, 20 - rainDiff / 10);
    score += rainScore;
    breakdown.push(`Rain Fit: ${rainScore.toFixed(1)}/20`);

    // 🎯 Humidity Score (0–10)
    let humidityScore = 0;
    const hMid = (crop.idealHumidity[0] + crop.idealHumidity[1]) / 2;
    const hDiff = Math.abs(avgHumidity - hMid);
    humidityScore = Math.max(0, 10 - hDiff / 5);
    score += humidityScore;
    breakdown.push(`Humidity Fit: ${humidityScore.toFixed(1)}/10`);

    // 🎯 Soil Match (0 or 10)
    const soilScore = crop.soilTypes.includes(soilType) ? 10 : 3;
    score += soilScore;
    breakdown.push(`Soil Match: ${soilScore}/10`);

    // 🎯 Sowing Month Score (0–15)
    let seasonScore = 0;
    if (monthInList(month, crop.sowingMonths)) {
      seasonScore = 15;
      breakdown.push("Season Fit: ✔ Ideal sowing month");
    } else if (monthInList(month, crop.harvestMonths)) {
      seasonScore = 7;
      breakdown.push("Season Fit: ⚠ Near harvest period");
    } else {
      seasonScore = 3;
      breakdown.push("Season Fit: ❌ Off-season");
    }
    score += seasonScore;

    // 🎯 Water Needs Score (0–10)
    const waterScore = waterMatchScore(crop.waterRequirement, totalRain);
    score += waterScore;
    breakdown.push(`Water Fit: ${waterScore}/10`);

    // 🎯 Market Demand (0–5)
    const marketScore = crop.marketDemandIndex * 5;
    score += marketScore;
    breakdown.push(`Market Demand: ${marketScore.toFixed(1)}/5`);

    // 🎯 Risk Factor (0–10) — lower risk = better
    const riskScore = (1 - crop.riskIndex) * 10;
    score += riskScore;
    breakdown.push(`Risk Safety: ${riskScore.toFixed(1)}/10`);

    return {
      name: crop.name,
      totalScore: Number(score.toFixed(1)),
      breakdown,
      meta: {
        seasons: crop.seasons,
        waterRequirement: crop.waterRequirement,
      },
    };
  });

  // Sort by best score
  scoredCrops.sort((a, b) => b.totalScore - a.totalScore);

  return {
    summary,
    avgTemp,
    avgHumidity,
    totalRain,
    topRecommendations: scoredCrops.slice(0, 3),
    alternateOptions: scoredCrops.slice(3, 7),
  };
};



// ---------------------------------------
// MAIN CONTROLLER — GENERATE ADVISORY
// ---------------------------------------
export const getCropAdvisory = async (req, res) => {
  try {
    const { location, soilType, sowingMonth } = req.body;
    const farmerLocation = location || req.farmer.location;

    if (!farmerLocation) {
      return res.status(400).json({
        message: "Location not provided and farmer has no saved location.",
      });
    }

    // Fetch weather forecast
    const forecastData = await getOpenWeatherData(farmerLocation);

    if (!forecastData || forecastData.cod !== "200") {
      return res.status(500).json({
        message: "Invalid city or unable to fetch weather.",
        details: forecastData,
      });
    }

    // Generate AI-level crop advisory
    const advisory = scoreCrops(
      forecastData,
      soilType || "loam",
      sowingMonth || null
    );

    // Persist only when DB mode is enabled and a farmer id exists.
    if (process.env.SKIP_DB !== "true" && req.farmer?._id) {
      await AdvisoryHistory.create({
        farmer: req.farmer._id,
        location: farmerLocation,
        soilType: soilType || "loam",
        sowingMonth: sowingMonth || new Date().getMonth() + 1,
        advisory,
      });
    }

    // Send response
    return res.json({
      location: farmerLocation,
      soilType: soilType || "loam",
      sowingMonth: sowingMonth || new Date().getMonth() + 1,
      advisory,
    });

  } catch (error) {
    console.error("Advisory Error:", error);
    return res.status(500).json({
      message: "Failed to generate crop advisory",
      details: error.message || error.toString(),
    });
  }
};
