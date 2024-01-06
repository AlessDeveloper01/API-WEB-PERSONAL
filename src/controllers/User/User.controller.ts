import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../../models";
import { UserInterface, UserPayload } from "../../interfaces";
import { ParsedQs } from "qs";

export const UserGet = async (req: Request, res: Response) => {

    try {
    const { user_id } = req.user! as UserPayload;
    // ...
        const userFind = await UserModel.findById({ _id: user_id });
        if (!userFind) {
            return res.status(404).json({
                msg: 'Este usuario no se encuentra'
            });
        }

        const { password, ...rest } = userFind.toObject();

        return res.status(200).json({
            msg: 'Usuario encontrado',
            user: rest
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al buscar usuario'
        });
    }
};

export const UserGetTotal = async (req: Request, res: Response) => {

    try {
        
        const { active } = req.query;
        let response = null;

        if (active === undefined || active === null || active === '') {
            response = await UserModel.find();
        } else {
            response = await UserModel.find({ active });
        }

        return res.status(200).json({
            msg: 'Usuarios encontrados',
            users: response
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al buscar usuarios'
        });
    }

};

export const UserCreate = async (req: Request, res: Response) => {

    try {
        const { firtsname, lastname, email, password, role }: UserInterface = req.body;

        const userCreado = new UserModel({
            firtsname,
            lastname,
            email,
            password: bcrypt.hashSync(password, 10),
            role,
            active: false,
        });

        const files = req.files as { [key: string]: any };
        if (files) {
            userCreado.avatar = 'default.png'; 
        }

        userCreado.avatar = `/img/users/${req.file?.filename}`

        await userCreado.save();

        return res.status(201).json({
            msg: 'Usuario creado',
            user: userCreado
        });

    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al crear usuario'
        });
    }

}
 
export const UserUpdate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firtsname, lastname, email, role, password }: UserInterface = req.body;
        
        if (password) {
            req.body.password = bcrypt.hashSync(password, 10);
        } else {
            delete req.body.password;
        }

        const userEncontrado = await UserModel.findById({ _id: id });
        if (!userEncontrado) {
            return res.status(404).json({
                msg: 'Este usuario no se encuentra'
            });
        }

        const files = req.files as { [key: string]: any };
        if (files) {
            req.body.avatar = `/img/users/${req.file?.filename}`; 
        } else {
            delete req.body.avatar;
        }

        // Actualizar el usuario
        const userActualizado = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json({
            msg: 'Usuario actualizado',
            user: userActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al actualizar usuario'
        });
    }
};

export const UserDelete = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const userEncontrado = await UserModel.findById({ _id: id });
        if (!userEncontrado) {
            return res.status(404).json({
                msg: 'Este usuario no se encuentra'
            });
        }

        await UserModel.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al eliminar usuario'
        });
    }

};