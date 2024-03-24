import express, { Request, Response} from 'express';
import { create, findMany, getUserTecnologies, createUserTecnologie } from '../controllers/UserController';
import { checkExistsUserAccount, checkExistsUsername } from '../middlewares/UserMiddlewares';

const router = express.Router()

router.get('/users', async (req: Request, res: Response) => {
    const users = await findMany();
    res.json(users);
  });

router.post('/users', checkExistsUserAccount, async (req:Request, res: Response) => {
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

router.get('/users/:username/tecnologies', checkExistsUsername, async(req: Request, res: Response) => {
    const tecnologies = await getUserTecnologies(req.params.username)
    return res.status(200).send(tecnologies)
})

router.post('/users/:username/tecnologies', checkExistsUsername, async(req: Request, res: Response) => {
    const username = req.params.username
    const tecnologie = await createUserTecnologie(username, req.body)
    res.status(201).send(tecnologie)
} )

export default router