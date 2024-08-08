import express, { Router } from 'express';
import { create, findMany, getUserTecnologies, createUserTecnologie } from '../controllers/UserController';
import { addUser, addUserTecnologie, fetchUserTecnologies, getUsers } from '../models/UserModel';
import { checkExistsUserName } from '../middlewares/checkExistsUserName';
import { checkExistsUserAccount } from '../middlewares/checkExistsUseraccount';

const router = express.Router()

router.post('/users', checkExistsUserName, addUser)

router.get('/users', getUsers)
  
router.get('/:username/technologies', checkExistsUserAccount, fetchUserTecnologies)

router.post('/:username/technologies', checkExistsUserAccount, addUserTecnologie )

export default router