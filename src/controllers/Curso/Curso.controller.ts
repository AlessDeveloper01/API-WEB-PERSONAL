import fs from 'fs';
import { Request, Response } from "express";
import { CourseModel } from "../../models";
import { CursoInterface } from "../../interfaces";
import { paginate } from "mongoose-paginate-v2"; 

export const CursoCreate = async (req: Request, res: Response) => {

    try {

        const { title, url, description, price, score } = req.body;


        const newCurso = new CourseModel({
            title,
            url,
            description,
            price,
            score
        });

        if (req.file) {
            newCurso.miniature = req.file.filename;
        } else {
            newCurso.miniature = 'default.png';
        }

        const cursoSaved = await newCurso.save();

        if(!cursoSaved) return res.status(400).json({
            message: 'Error al crear el curso'
        });

        return res.status(201).json({
            message: 'Curso creado correctamente',
            cursoSaved
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al crear el curso'
        });
    }
}

export const CursoGet = async (req: Request, res: Response) => {
    try {
        const opciones = {
             page: Number(req.query.page) || 1,
             limit: Number(req.query.limit) || 10
        }

        const cursosObtenidos = await CourseModel.find()
                .skip((opciones.page - 1) * opciones.limit) // Corregir la fórmula para calcular el número de documentos a omitir
                .limit(opciones.limit)
                .exec();
        

        if (!cursosObtenidos) return res.status(400).json({
            message: 'Error al obtener los cursos'
        });

        return res.status(200).json({
            message: 'Cursos obtenidos correctamente',
            cursosObtenidos,
            totalPages: cursosObtenidos.length,
            currentPage: opciones.page
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al obtener los cursos'
        });
    }
};

export const CursoUpdate = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        if (req.file) {
            const cursoAnterior = await CourseModel.findById(id);
            if (cursoAnterior && cursoAnterior.miniature !== 'default.png') {
                const filePath = `public/img/courses/${cursoAnterior.miniature}`;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            req.body.miniature = req.file.filename;
        } else {
            delete req.body.miniature;
        }

        if(!id) return res.status(400).json({
            message: 'Error al actualizar el curso'
        });

        const cursoActualizado = await CourseModel.findByIdAndUpdate({ _id: id  }, req.body, { new: true });

        if(!cursoActualizado) return res.status(400).json({
            message: 'Error al actualizar el curso'
        });

        return res.status(200).json({
            message: 'Curso actualizado correctamente',
            cursoActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al actualizar el curso'
        });
    }
}
 
export const CursoDelete = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        if(!id) return res.status(400).json({
            message: 'Error al eliminar el curso'
        });

        const eliminarImagen = await CourseModel.findById(id);
            if (eliminarImagen && eliminarImagen.miniature !== 'default.png') {
                const filePath = `public/img/courses/${eliminarImagen.miniature}`;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        const cursoEliminado = await CourseModel.findByIdAndDelete({ _id: id });

        if(!cursoEliminado) return res.status(400).json({
            message: 'Error al eliminar el curso'
        });

        return res.status(200).json({
            message: 'Curso eliminado correctamente',
            cursoEliminado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al eliminar el curso'
        });
    }

 }