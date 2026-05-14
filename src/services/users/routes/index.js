import { Router } from "express";
import { validate } from "../../../middleware/validate.js";
import { createUser, getUserById } from '../controller/user-controller.js';
import { userPayloadSchema } from '../../../services/users/validator/schema.js';

const router = Router();

router.post('/users', validate(userPayloadSchema), createUser);
router.get('/users/:id', getUserById);
 
export default router;