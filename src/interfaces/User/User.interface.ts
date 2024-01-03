
export interface UserInterface {
    token: any;
    generateToken(): any;
    _id?: string;
    firtsname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    avatar: string;
}