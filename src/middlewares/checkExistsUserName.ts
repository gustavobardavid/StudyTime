
import { Request, Response, NextFunction } from 'express';
import { findMany } from '../models/UserModel';


export const checkExistsUserName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userName = req.body.username; 
  const usersNoBanco = await findMany();
  const user = usersNoBanco.find(u => u.username === userName);
    
  if (user) {
    res.status(404).json({ message: `Username ${user.username} is already in use. Please, choose another username` });
    return;
  }
  next();
};