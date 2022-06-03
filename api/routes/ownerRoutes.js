import express from 'express';
import * as ownerController from '../controllers/OwnerController.js';

const router = express.Router();

router.post('/owners', ownerController.createOwner);
router.get('/owners', ownerController.getOwners);
router.get('/owners/:id', ownerController.getOwnerByIdWithPets);

export default router;
