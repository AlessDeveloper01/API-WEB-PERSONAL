import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserInterface } from '../interfaces';
dotenv.config({ path: '.env' });

function generateToken(user: UserInterface) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    const payload = {
        token_type: 'access',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET!);
}

function generateRefreshToken(user: UserInterface) {
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 1);

    const payload = {
        token_type: 'refresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET!);
}

function decodeToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}

export { generateToken, generateRefreshToken, decodeToken };