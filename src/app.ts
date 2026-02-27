import express from "express";
import beersRoutes from "./routes/beers.routes";

const app = express();

app.use(express.json());
app.use("/api/beers", beersRoutes);

export default app;
