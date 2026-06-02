require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/tasks", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Complete Studio Graphene Assessment",
      completed: false,
    },
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});