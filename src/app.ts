import express from "express";
import cors from "cors";

import profesionalesRouter from "./routes/profesionales";
import tratamientosRouter from "./routes/tratamientos";
import adminRouter from "./routes/admin";
import especialidadesRouter from "./routes/especialidades";
import turnosRouter from "./routes/turnos";
import horariosRouter from "./routes/horarios";
import clientesRouter from "./routes/clientes";
import authRouter from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/profesionales", profesionalesRouter);
app.use("/tratamientos", tratamientosRouter);
app.use("/admin", adminRouter);
app.use("/especialidades", especialidadesRouter);
app.use("/turnos", turnosRouter);
app.use("/horarios", horariosRouter);
app.use("/clientes", clientesRouter);
app.use("/auth", authRouter);
app.listen(3000, () => {
  console.log("El servidor está andando");
});
