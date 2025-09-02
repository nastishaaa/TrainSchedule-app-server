import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { dbPool } from '../db-init.js';

import { THIRTY_DAYS } from "../constants/index.js";
import { loginUser, registerUser, logoutUser } from "../services/auth.js";
import { LoginDTO, RegisterDTO, Session } from "../types/auth.js"

const setupSession = (res: Response, session: Session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });

    res.cookie('sessionId', session.id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
}

export const loginUserController = async (req: Request<{}, {}, LoginDTO>, res: Response) => {
    try {
        const session: Session = await loginUser(req.body);
        setupSession(res, session);

        res.status(200).json({
            status: 200,
            message: 'Successfully logged in an user!',
            data: { accessToken: session.accessToken },
        });
    } catch (error: any) {
        console.error(error);
        res.status(error.status || 400).json({
            status: error.status || 400,
            message: error.message || 'Something went wrong!',
        });
    }
}

export const registerUserController = async (req: Request<{}, {}, RegisterDTO>, res: Response) => {
    try {
        const user = await registerUser(req.body);

        const { password, ...userWithoutPassword } = user;


        res.status(201).json({
            status: 201,
            message: 'Successfully registered a user!',
            data: userWithoutPassword,
        });
    } catch (error: any) {
        console.error(error);
        res.status(error.status || 400).json({
            status: error.status || 400,
            message: error.message || 'Something went wrong!',
        });
    }
}

export const logoutUserController = async (req: Request, res: Response) => {
    try {
        if (req.cookies.sessionId) {
            await logoutUser(req.cookies.sessionId);
        }

        res.clearCookie('sessionId');
        res.clearCookie('refreshToken');

        res.status(204).send();
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
        });
    }
}

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        
        const client = await dbPool.connect();
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

        const result = await dbPool.query(
            "SELECT id, name, email FROM users WHERE id = $1",
            [decoded.userId]
        );

        client.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            status: 200,
            message: "User fetched successfully",
            data: result.rows[0],
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
}