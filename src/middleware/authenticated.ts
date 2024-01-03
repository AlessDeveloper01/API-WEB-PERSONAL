import { NextFunction, Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';
import { decodeToken } from '../utils/generate-jwt';

declare module 'express-serve-static-core' {
    interface Request {
        user?: jwt.JwtPayload;
    }
}

export const AuthComprober = (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return res.status(403).json({
            msg: 'Token no valido'
        })
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        

        const payload = decodeToken(token) as jwt.JwtPayload;
        const { exp } = payload;
        const currentDate = new Date().getTime();

        if (exp! <= currentDate) {
            return res.status(403).json({
                msg: 'Token expirado'
            });
        }

        req.user = payload;
        next();


    } catch (error) {
        console.log(error);
        return res.status(403).json({
            msg: 'Token no valido'
        })
    }
}