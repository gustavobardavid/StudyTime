import express, { Router } from 'express';
import { addUser, addUserTechnologie, fetchUserTecnologies, getUsers, markTechnologieAsStudied } from '../controllers/UserController';
import { checkExistsUserName } from '../middlewares/checkExistsUserName';
import { checkExistsUserAccount } from '../middlewares/checkExistsUserAccount';

const router = express.Router()

router.post('/users', checkExistsUserName, addUser)

router.get('/users', getUsers)
  
router.get('/:username/technologies', checkExistsUserAccount, fetchUserTecnologies)

router.post('/:username/technologies', checkExistsUserAccount, addUserTechnologie )

router.patch('/:username/technologies/:id/study', checkExistsUserAccount, markTechnologieAsStudied);

export default router