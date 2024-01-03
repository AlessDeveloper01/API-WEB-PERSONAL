import { Schema, Model, model } from "mongoose";
import { UserInterface } from "../../interfaces";

const userSchema = new Schema({
    firtsname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String
})

export const UserModel = model<UserInterface>('User', userSchema);
