import { THIRTY_DAYS } from "../constants/index.js";
import { loginUser, registerUser, logoutUser } from "../services/auth.js";
const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', session.id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
};
export const loginUserController = async (req, res) => {
    try {
        const session = await loginUser(req.body);
        setupSession(res, session);
        res.status(200).json({
            status: 200,
            message: 'Successfully logged in an user!',
            data: { accessToken: session.accessToken },
        });
    }
    catch (error) {
        console.error(error);
        res.status(error.status || 400).json({
            status: error.status || 400,
            message: error.message || 'Something went wrong!',
        });
    }
};
export const registerUserController = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            status: 201,
            message: 'Successfully registered a user!',
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(error.status || 400).json({
            status: error.status || 400,
            message: error.message || 'Something went wrong!',
        });
    }
};
export const logoutUserController = async (req, res) => {
    try {
        if (req.cookies.sessionId) {
            await logoutUser(req.cookies.sessionId);
        }
        res.clearCookie('sessionId');
        res.clearCookie('refreshToken');
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
        });
    }
};
