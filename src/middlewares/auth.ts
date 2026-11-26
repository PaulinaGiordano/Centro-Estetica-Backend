import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verificarToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "No estás autorizado" });
  }

  const token = header.substring(7);

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).usuario = datos;
    next();
  } catch {
    return res.status(401).json({ mensaje: "Sesión vencida o inválida" });
  }
}

export function soloAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req as any).usuario.rol !== "admin") {
    return res.status(403).json({ mensaje: "No tenés permiso" });
  }
  next();
}

export function soloCliente(req: Request, res: Response, next: NextFunction) {
  if ((req as any).usuario.rol !== "cliente") {
    return res.status(403).json({ mensaje: "No tenés permiso" });
  }
  next();
}
