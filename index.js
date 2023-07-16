const express = require("express");
const app = express();
const database = require("nedb");
app.listen(3000, () => console.log("Server is running on port"));
app.use(express.static("./Public"));
app.use(express.json({ limit: "1mb" }));
const db = new database("store.db");
db.loadDatabase();
app.get("/api", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      res.end();
      return;
    }
    res.send(docs);
  });
});
app.post("/api", (req, res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  db.insert(data);
  res.json({
    status: "success",
    latitude: data.lat,
    timestamp: timestamp,
    longitude: data.lon,
  });
});
