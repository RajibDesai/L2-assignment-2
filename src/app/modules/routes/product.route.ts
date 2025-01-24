import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';

const router = Router();

// Define the routes
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getProductById);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);

export default router;
