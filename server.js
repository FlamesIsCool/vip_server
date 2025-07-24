const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/:placeId", async (req, res) => {
  const placeId = req.params.placeId;
  if (!/^\d+$/.test(placeId)) return res.status(400).json({ error: "Invalid place ID" });

  try {
    const result = await axios.get(`https://rbxservers.xyz/api/game/${placeId}`);
    res.json(result.data);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: "No VIP servers found for this game." });
    }
    res.status(500).json({ error: "Upstream fetch failed", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Running on port ${PORT}`);
});
