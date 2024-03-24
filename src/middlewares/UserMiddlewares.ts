import { PrismaClient } from '@prisma/client';
import e, { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const checkExistsUsername = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.params.username,
            },
        })
        
        if (user) {
           return res.status(400).json({message: 'Username already exists'})
        } else {
            next()
        }
    } catch (e) {
        throw e
    }
}

export const checkExistsUserAccount = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.params.username,
            },
        })
        
        if (user) {
            next()
        } else {
            return res.status(400).json({message: 'User not exists'})
        }
    } catch (e) {
        throw e
    }
}