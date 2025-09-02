import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: number;
}

export const authorization = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        (req as any).userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
}
