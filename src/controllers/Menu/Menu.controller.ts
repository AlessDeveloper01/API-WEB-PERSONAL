import { Request, Response } from 'express';
import {MenuInterface} from '../../interfaces';
import { MenuModel } from '../../models';

export const MenuRegister = async (req: Request, res: Response) => {

    try {
        
        const { title, path, active, order }: MenuInterface = req.body;
        if (!title || !path) {
            return res.status(400).json({
                msg: 'Por favor envie todos los campos'
            });
        }

        const menu = new MenuModel({
            title,
            path,
            active: active || false,
            order: order || 0
        });

        await menu.save();

        if (!menu) {
            return res.status(400).json({
                msg: 'Error al registrar el menu'
            });
        }

        res.status(201).json({
            msg: 'Menu registrado exitosamente',
            menu
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al registrar el menu'
        });
    }

};
 
export const MenuGet = async (req: Request, res: Response) => {

    try {
        const { active } = req.query;

        let response = null;

        if (active == undefined || active == null || active == '') {
            response = await MenuModel.find().sort({ order: 'asc' });
        } else {
            response = await MenuModel.find({ active }).sort({ order: 'asc' });
        }

        if (!response) {
            return res.status(400).json({
                msg: 'Error al obtener el menu'
            });
        }

        res.status(200).json({
            msg: 'Menu obtenido exitosamente',
            response
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el menu'
        });
    }
};
 
export const MenuUpdate = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const { title, path, active, order }: MenuInterface = req.body;

        const menu = await MenuModel.findByIdAndUpdate({_id: id}, {
            title,
            path,
            active: active || false,
            order: order || 0
        }, { new: true });

        if (!menu) {
            return res.status(400).json({
                msg: 'Error al actualizar el menu'
            });
        }

        res.status(201).json({
            msg: 'Menu actualizado exitosamente',
            menu
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el menu'
        });
    }
};
 
export const MenuDelete = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        const menuDelete = await MenuModel.findByIdAndDelete({ _id: id });
        
        if (!menuDelete) {
            return res.status(400).json({
                msg: 'Error al eliminar el menu'
            });
        }

        res.status(201).json({
            msg: 'Menu eliminado exitosamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al eliminar el menu'
        });
    }

 };