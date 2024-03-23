import express, { Request, Response} from 'express';
import { create, findMany } from '../controllers/UserController';

const router = express.Router()

router.get('/users', async (req: Request, res: Response) => {
    const users = await findMany();
    res.json(users);
  });

router.post('/users', async (req:Request, res: Response) => {
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

export default router