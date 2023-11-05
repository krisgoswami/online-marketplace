import express from 'express';
import { getItem, getItems, searchItems } from '../controllers/commonRoutesController.js';

const router = express.Router();

router.get('/search', searchItems);
router.get('/get-items', getItems);
router.get('/get-item/:id', getItem);

export default router;