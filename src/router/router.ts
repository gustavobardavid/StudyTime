import express, { Request, Response} from 'express';
import { create, findMany, getUserTecnologies, createUserTecnologie } from '../controllers/UserController';
import { checkExistsUserAccount, checkExistsUsername } from '../middlewares/UserMiddlewares';
import { addUser, addUserTecnologie, fetchUserTecnologies, getUsers } from '../model/UserModel';

const router = express.Router()

router.get('/users', getUsers)
  
router.get('/users/:username/tecnologies', checkExistsUserAccount, fetchUserTecnologies)

router.post('/users', checkExistsUsername, addUser)

router.post('/users/:username/tecnologies', checkExistsUserAccount, addUserTecnologie )

export default router