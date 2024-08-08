
import { Request, Response, NextFunction } from 'express';
import { findMany } from '../controllers/UserController';

export const checkExistsUserAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userName = req.params.username; 
  const usersNoBanco = await findMany();
  const userEncontrado = usersNoBanco.find(u => u.username === userName);
    
  if (!userEncontrado) {
    res.status(404).json({ message: 'User not exists.' });
    return;
  } 

  req.body.user = userEncontrado;
  next();
};