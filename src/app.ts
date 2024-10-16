import "reflect-metadata";
import { sequelize } from "./database/sequelize-source";
import express from "express";
import router from "./routes/index";
import cors from "cors";
import bodyParser from "body-parser";
import { User } from "../models/user.model"; // Import models
import { Token } from "../models/user-token.model"; // Import models
import "../src/associations/association"; // Import associations

const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Use the API router
app.use("/api", router);
// Authenticate and sync database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    // Initialize models
    User.initialize(sequelize);
    Token.initialize(sequelize);
    // Define associations
    User.associate();
    Token.associate();
    // Start the server after ensuring the database is connected
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
    console.error("Error details:", err);
  });
export default app;
