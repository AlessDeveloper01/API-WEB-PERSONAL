import { Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { UserModel } from "../../models";

export const UserGet = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.user as jwt.JwtPayload;

        const userFind = await UserModel.findById(user_id);
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
    
}