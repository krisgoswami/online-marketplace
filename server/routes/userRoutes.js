import express from 'express';
import { authenticateJWT } from '../utils/jwsAuth.js'
import { createItem, createUser, deleteItem, listedItems, purchase, purchasedItems, updateItem, userDetails, userLogin, userProfile } from '../controllers/userController.js';


const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/profile/:id', authenticateJWT, userDetails);
router.put('/profile/:id', authenticateJWT, userProfile);
router.post('/create-item', authenticateJWT, createItem);
router.get('/listed-items', authenticateJWT, listedItems);
router.put('/update-item/:id', authenticateJWT, updateItem);
router.delete('/delete-item/:id', authenticateJWT, deleteItem);
router.post('/purchase/:id', authenticateJWT, purchase);
router.get('/purchased-items', authenticateJWT, purchasedItems);

export default router;