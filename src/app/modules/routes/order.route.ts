import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';

const router = Router();

router.post('/', OrderController.createOrder);
router.get('/revenue', OrderController.calculateRevenue);

export default router;
