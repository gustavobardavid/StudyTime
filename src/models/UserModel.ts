import { PrismaClient , User, Tecnologie } from '@prisma/client'
import e from 'express';

const prisma = new PrismaClient()

export const create = async (name: string, username: string): Promise<User | null> => {
    try {
      const userCreated = await prisma.user.create({
        data: {
          name: name,
          username: username
        }
      });
      return userCreated;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  };

export const findMany = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany({
        include: {
            tecnologies: true
        }
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getUserTecnologies = async(username: string): Promise<Tecnologie[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        tecnologies: true
      }
    })
    if (user) {
      return user.tecnologies
    } else {
      return []
    }
  } catch (e) {
    throw e
  }
}

export const createUserTecnologie = async (username: string, tecnologie: Tecnologie): Promise<Tecnologie> => {
  try {
    const newTecnologie = await prisma.tecnologie.create({
      data: {
        title: tecnologie.title,
        studied: tecnologie.studied,
        user: {
          connect: { 
            username: username
          }
        }
      }
    })
    return newTecnologie
  } catch (e) {
    throw e
  }
}

export const markAsStudied = async (username: string, technologieId: string): Promise<boolean> => {
  try {
    const result = await prisma.tecnologie.updateMany({
      where: {
        id: parseInt(technologieId),
        user: {
          username: username
        }
      },
      data: {
        studied: true
      }
    });
    return result.count > 0;
  } catch (error) {
    console.error('Error marking tecnologie as studied:', error);
    return false;
  }
};
