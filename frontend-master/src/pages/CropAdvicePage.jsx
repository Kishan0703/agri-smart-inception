import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL2 || "http://localhost:8000";

const CropAdvicePage = () => {
  const { cropName } = useParams();

  const [form, setForm] = useState({
    fertilizer: "",
    pesticide: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    organic_carbon: "",
    language: "English"
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const languages = [
  "English", "Hindi", "Tamil", "Telugu", "Marathi", 
  "Bengali", "Gujarati", "Kannada", "Malayalam", 
  "Punjabi", "Urdu", "Odia", "Assamese", "Sanskrit",
  "Kashmiri", "Konkani", "Maithili", "Sindhi", "Nepali",
  "Bhojpuri"
];

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/get-environment-friendly-advice`, {
        cropName,
        fertilizer: form.fertilizer,
        pesticide: form.pesticide,
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
        ph: Number(form.ph),
        organic_carbon: Number(form.organic_carbon),
        language: form.language
      });
      setResponse(res.data);
    } catch (err) {
      alert("Error fetching AI advice");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>🌱 Soil + Input Advisory for {cropName}</h2>

      {/* Language Selection */}
      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h3 style={{ marginTop: "0" }}>🌐 Select Language for AI Response</h3>
        <select 
          name="language" 
          value={form.language} 
          onChange={change}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: "300px"
          }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
          AI will respond in {form.language}
        </p>
      </div>

      <h3>🧪 Soil Test Report</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Nitrogen (kg/ha):</label>
          <input 
            name="nitrogen" 
            value={form.nitrogen} 
            onChange={change}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            type="number"
            step="0.1"
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Phosphorus (kg/ha):</label>
          <input 
            name="phosphorus" 
            value={form.phosphorus} 
            onChange={change}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            type="number"
            step="0.1"
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Potassium (kg/ha):</label>
          <input 
            name="potassium" 
            value={form.potassium} 
            onChange={change}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            type="number"
            step="0.1"
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Soil pH:</label>
          <input 
            name="ph" 
            value={form.ph} 
            onChange={change}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            type="number"
            step="0.1"
            min="0"
            max="14"
          />
        </div>
        
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Organic Carbon %:</label>
          <input 
            name="organic_carbon" 
            value={form.organic_carbon} 
            onChange={change}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            type="number"
            step="0.1"
            min="0"
            max="100"
          />
        </div>
      </div>

      <h3>💧 Fertilizer & Pesticide Plan</h3>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Fertilizer you plan to use:</label>
          <input 
            name="fertilizer" 
            value={form.fertilizer} 
            onChange={change}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            placeholder="e.g., Urea, DAP, NPK"
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Pesticide you plan to use:</label>
          <input 
            name="pesticide" 
            value={form.pesticide} 
            onChange={change}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            placeholder="e.g., Carbaryl, Malathion"
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 30px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          maxWidth: "300px"
        }}
      >
        {loading ? "Getting AI Advice..." : "Get Eco-Friendly Suggestions"}
      </button>

      {response && (
        <div style={{
          marginTop: "25px",
          padding: "20px",
          border: "1px solid #4CAF50",
          borderRadius: "8px",
          backgroundColor: "#f9fff9"
        }}>
          <h3 style={{ color: "#2E7D32", marginTop: "0" }}>
            🌿 Environment-Friendly AI Suggestions ({form.language})
          </h3>

          <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "white", borderRadius: "5px" }}>
            <p style={{ margin: "8px 0" }}>
              <strong style={{ color: "#2E7D32" }}>🌱 Eco Fertilizer:</strong> {response.environment_friendly_fertilizer}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>📝 Reason:</strong> {response.fertilizer_reason}
            </p>
          </div>

          <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "white", borderRadius: "5px" }}>
            <p style={{ margin: "8px 0" }}>
              <strong style={{ color: "#2E7D32" }}>🐛 Eco Pesticide:</strong> {response.environment_friendly_pesticide}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>📝 Reason:</strong> {response.pesticide_reason}
            </p>
          </div>

          <div style={{ padding: "10px", backgroundColor: "#e8f5e9", borderRadius: "5px" }}>
            <p style={{ margin: "8px 0" }}>
              <strong style={{ color: "#2E7D32" }}>🌍 Soil Health Tip:</strong> {response.soil_health_advice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropAdvicePage;