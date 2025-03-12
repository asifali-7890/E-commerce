import express from 'express';
import { addProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', addProduct);
router.get('/list', listProducts);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', updateProduct);
router.get('/:id', getProductById);

export default router;