import express, { Request, Response} from 'express';
import { create, findMany, getUserTecnologies, createUserTecnologie } from '../controllers/UserController';
import { checkExistsUserAccount, checkExistsUsername } from '../middlewares/UserMiddlewares';
import { addUserTecnologie, fetchUserTecnologies, getUsers } from '../model/UserModel';

const router = express.Router()

router.get('/users', getUsers)
  
router.get('/users/:username/tecnologies', checkExistsUserAccount, fetchUserTecnologies)

router.post('/users', checkExistsUsername, async (req:Request, res: Response) => {
    const { name, username} = req.body
    if (!name || !username) {
        return res.status(400).json({ error: 'Name and username are required' });
    }
    const newUser = await create(name, username);
    if (newUser) {
        return res.status(201).json(newUser);
    } else {
        return res.status(500).json({ error: 'Failed to create user' });
    }
})

router.post('/users/:username/tecnologies', checkExistsUserAccount, addUserTecnologie )

export default router