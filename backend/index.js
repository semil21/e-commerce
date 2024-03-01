import connectDB from "./database/database.js";
import Express from "express";
import cors from "cors";

connectDB();

const app = Express();
// const cors = require("cors");

// app.use(cors());
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:8000/"], // Whitelist the domains you want to allow
};
app.use(cors(corsOptions));

app.use(Express.json());

import categoryRouter from "./routes/category.route.js";

app.use("/category", categoryRouter);

app.listen(8000, () => {
  console.log("Server running on 8000");
});
