import express, { Router } from 'express';
import { create, findMany, getUserTecnologies, createUserTecnologie } from '../controllers/UserController';
import { addUser, addUserTecnologie, fetchUserTecnologies, getUsers } from '../models/UserModel';
import { checkExistsUserName } from '../middlewares/checkExistsUserName';
import { checkExistsUserAccount } from '../middlewares/checkExistsUserAccount';

const router = express.Router()

router.post('/users', checkExistsUserName, addUser)

router.get('/users', getUsers)
  
router.get('/users/:username/tecnologies', checkExistsUserAccount, fetchUserTecnologies)


router.post('/users/:username/tecnologies', checkExistsUserAccount, addUserTecnologie )

export default router