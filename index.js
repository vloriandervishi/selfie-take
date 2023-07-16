const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server is running on port"));

app.use(express.static("./Public"));
app.use(express.json({ limit: "1mb" }));
app.post("/api", (req, res) => {
  console.log(req.body);
  const data = req.body;
  res.json({ status: "success", latitude: data.lat, longitude: data.lon });
});
