import express, { Request, Response} from 'express';
import { create, findMany, getUserTecnologies, createUserTecnologie, markAsStudied } from '../models/UserModel';

export const addUserTechnologie = async(req: Request, res: Response) => {
    const username = req.params.username;
    const tecnologie = await createUserTecnologie(username, req.body);
    if (tecnologie) {
        res.status(201).send(tecnologie);
    } else {
        res.status(400).json({ message: 'Failed to create user tecnologie' });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    const users = await findMany();
    if (users) {
        return res.status(200).json(users);
    } else {
        return res.status(500).json({message: 'Failed to fetch Users'})
    }
}

export const fetchUserTecnologies = async(req: Request, res: Response) => {
    const tecnologies = await getUserTecnologies(req.params.username)
    return res.status(200).send(tecnologies)
}

export const addUser =  async (req:Request, res: Response) => {
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
}

export const markTechnologieAsStudied = async (req: Request, res: Response) => {
    const username = req.params.username;
    const technologieId = req.params.id;

    if (!username || !technologieId) {
        return res.status(400).json({ error: 'Username and tecnologie name are required' });
    }

    const success = await markAsStudied(username, technologieId);
    if (success) {
        return res.status(200).json({ message: 'Tecnologie marked as studied' });
    } else {
        return res.status(500).json({ error: 'Failed to mark tecnologie as studied' });
    }
};