import { PrismaClient } from '@prisma/client';
import e, { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const checkExistsUserAccount = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        })
        
        if (user) {
           return res.status(500).json({message: 'Username já existe'})
        } else {
            next()
        }
    } catch (e) {
        throw e
    }
}