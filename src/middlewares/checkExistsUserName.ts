
import { Request, Response, NextFunction } from 'express';
import { getUsers } from '../models/UserModel';
import { findMany } from '../controllers/UserController';


export const checkExistsUserName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userName = req.body.username; 
  const usersNoBanco = await findMany();
  const user = usersNoBanco.find(u => u.username === userName);
    
  if (user) {
    res.status(404).json({ message: 'Username já está em uso.' });
    return;
  }
  next();
};