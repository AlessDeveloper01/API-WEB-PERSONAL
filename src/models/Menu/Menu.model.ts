import { Schema, Model, model } from "mongoose";
import { MenuInterface } from "../../interfaces";

const menuSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    order: Number,
    active: Boolean,
})

export const MenuModel = model<MenuInterface>('Menu', menuSchema);
