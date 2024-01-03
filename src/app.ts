import express from 'express';
import cors from 'cors';

import db from './config/db';
import { AuthRouter, UserRouter } from './router';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cors());

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);

app.listen(process.env.DB_PORT || 3000, () => { 
    console.log(`Server on port ${process.env.DB_PORT || 3000}`);
    db();
});
