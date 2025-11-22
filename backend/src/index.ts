import express from "express";

const app = express();
const PORT = 3001;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost${PORT}`);
});
