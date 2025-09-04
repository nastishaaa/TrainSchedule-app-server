import { dbPool } from '../db-init.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import randomBytes from 'randombytes';
import createHttpError from 'http-errors';
import { QueryResult } from 'pg';

import { User, Session } from '../types/dbInterface.js';
import { THIRTY_DAYS } from '../constants/index.js';

dotenv.config();

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    sessionId: number | string;
    user: User;
}

export const loginUser = async (
    payload: LoginPayload
): Promise<{ accessToken: string; refreshToken: string; sessionId: number; user: { name: string, email: string } }> => {
    try {
        const { email, password } = payload;

        const userRes: QueryResult<User> = await dbPool.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        );
        const user = userRes.rows[0];
        if (!user) throw createHttpError(404, 'User not found');

        const userPassword = user.password;
        const { password: _, ...userWithoutPass } = user;

        const isEqual = await bcrypt.compare(payload.password, userPassword);
        if (!isEqual) throw createHttpError(401, 'Unauthorized');

        await dbPool.query(`DELETE FROM sessions WHERE user_id=$1`, [user.id]);

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        const refreshToken = randomBytes(30).toString('base64');
        const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

        const sessionRes: QueryResult<Session> = await dbPool.query(
            `INSERT INTO sessions (user_id, access_token, refresh_token, expires_at)
     VALUES ($1,$2,$3,$4) RETURNING *`,
            [user.id, accessToken, refreshToken, refreshTokenValidUntil]
        );

        return {
            accessToken,
            refreshToken,
            sessionId: sessionRes.rows[0].id,
            user: userWithoutPass
        };
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
        const { name, email, password } = payload;

        const existingUser: QueryResult<User> = await dbPool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw createHttpError(409, 'User with this email already exists');
        }

        const hashedPass = await bcrypt.hash(password, 10);
        
        const res: QueryResult<User> = await dbPool.query(
            `INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *`,
            [name, email, hashedPass]
        );

        const accessToken = jwt.sign(
            { userId: res.rows[0].id },
            process.env.JWT_SECRET as string,
            { expiresIn: "15m" }
        );
        const refreshToken = randomBytes(30).toString('base64');
        const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);

        const sessionRes: QueryResult<Session> = await dbPool.query(
            `INSERT INTO sessions (user_id, access_token, refresh_token, expires_at)
     VALUES ($1,$2,$3,$4) RETURNING *`,
            [res.rows[0].id, accessToken, refreshToken, refreshTokenValidUntil]
        );


        return {
            accessToken,
            refreshToken,
            sessionId: sessionRes.rows[0].id,
            user: res.rows[0],
        }
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}

export const logoutUser = async (refreshToken: string): Promise<void> => {
    await dbPool.query(`DELETE FROM sessions WHERE refresh_token=$1`, [refreshToken]);
}

