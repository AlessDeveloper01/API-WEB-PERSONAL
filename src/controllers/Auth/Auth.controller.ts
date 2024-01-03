
import { Request, Response } from 'express';
import { UserModel } from '../../models';
import { UserInterface } from '../../interfaces';
import bcrypjs from 'bcryptjs';
import { generateRefreshToken, generateToken, decodeToken } from '../../utils/generate-jwt';
import Jwt from 'jsonwebtoken';

export const AuthRegister = async (req: Request, res: Response) => {

    try {
        const { firtsname, lastname, email, password } = req.body;

        if (!email || !password || !firtsname || !lastname) return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        if (password.length < 6) return res.status(400).json({ msg: 'El password debe ser mayor a 6 caracteres' });
        
        const userRegistrado = new UserModel({
            email: email.toLowerCase(),
            password: bcrypjs.hashSync(password, 10),
            firtsname,
            lastname,
            role: 'user',
            active: false,
            avatar: 'default.png'
        });

        const user = await userRegistrado.save();
        
        if (!user) return res.status(400).json({
            msg: 'Error al crear el usuario'
        });

        const usuarioIgual: UserInterface | null = await UserModel.findOne({ email: email.toLowerCase() });
        if (usuarioIgual) return res.status(400).json({
            msg: 'El usuario ya existe'
        });

        res.json({
            msg: 'Usuario creado correctamente',
            user
        });           
    } catch (error) {
         return res.status(400).json({
            msg: 'El usuario ya existe'
        });
    }
}

export const AuthLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    try {
        if(!email || !password) return res.status(400).json({
            msg: 'Todos los campos son obligatorios'
        }); 

        const usuario: UserInterface | null = await UserModel.findOne({ email: email.toLowerCase() });

        const passwordCorrecto = bcrypjs.compareSync(password, usuario!.password);

        if(!passwordCorrecto) return res.status(400).json({
            msg: 'El password es incorrecto'
        });

        if(!usuario!.active) return res.status(400).json({
            msg: 'El usuario no esta activo'
        });

        return res.status(200).json({
            msg: 'Login correcto',
            access: generateToken(usuario!),
            refreshToken: generateRefreshToken(usuario!)
        });


    } catch (error) {
        return res.status(400).json({
            msg: 'Los datos son incorrectos'
        });
    }
}

export const AuthRefreshToken = async (req: Request, res: Response) => {

    try {
        const { token } = req.body;

        if (!token) return res.status(400).json({
            msg: 'El token es obligatorio'
        });

        const tokenDecoded = decodeToken(token) as Jwt.JwtPayload;
        const { user_id } = tokenDecoded;

        const userEncontrado = await UserModel.findOne({ _id: user_id });

        if (!userEncontrado) return res.status(500).json({
            msg: 'Error del servidor'
        });

        if (!userEncontrado.active) return res.status(400).json({
            msg: 'El usuario no esta activo'
        });

        return res.status(200).json({
            msg: 'Token actualizado',
            access: generateToken(userEncontrado)
        });

    } catch (error) {
        return res.status(400).json({
            msg: 'El token no es valido'
        });
    }
}