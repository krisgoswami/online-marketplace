import express from 'express';
import { getItem, getItems } from '../controllers/commonRoutesController.js';

const router = express.Router();

router.get('/get-items', getItems);
router.get('/get-item/:id', getItem);

export default router;