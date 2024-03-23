import { PrismaClient , User } from '@prisma/client'

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


