import { add, contactById, deleteById, getcontact, updateById, userById } from "../controllers/contactapi.js";
import express from 'express';
import { isauthenticate } from "../Middlewares/Auth.js";
const router = express.Router();

router.post('/new',isauthenticate,add);
router.get('/',getcontact);
router.get('/:find_by_id',contactById)
router.put('/:updatebyid',isauthenticate,updateById);
router.delete('/:deletebyid',isauthenticate,deleteById);
router.get('/userid/:id',userById)
export default router;