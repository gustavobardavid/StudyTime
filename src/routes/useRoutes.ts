import express, { Router } from 'express';
import { addUser, addUserTecnologie, fetchUserTecnologies, getUsers } from '../controllers/UserController';
import { checkExistsUserName } from '../middlewares/checkExistsUserName';
import { checkExistsUserAccount } from '../middlewares/checkExistsUserAccount';

const router = express.Router()

router.post('/users', checkExistsUserName, addUser)

router.get('/users', getUsers)
  
router.get('/:username/technologies', checkExistsUserAccount, fetchUserTecnologies)

router.post('/:username/technologies', checkExistsUserAccount, addUserTecnologie )

export default router