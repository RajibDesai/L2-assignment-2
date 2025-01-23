import express from 'express';
import { createOrder } from '../controllers/order.controller.js';
import { calculateRevenue } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/revenue', calculateRevenue);

export default router;
