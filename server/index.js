import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';

dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

// Get the directory name for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT_SECRET to check if it's loaded

// Middleware to parse JSON bodies
app.use(express.json());
// Catch-all route to serve the React app's index.html for any other route



const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});