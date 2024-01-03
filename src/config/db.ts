import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { connect } from 'mongoose';

const db = async () => {
    try {
        await connect(process.env.DB_URL || '');
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
}

export default db;
