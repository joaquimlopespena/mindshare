import { prisma } from "../../prisma/prisma";
import { CreateUserInput } from "../dtos/input/user.input";
import { UserModel } from "../models/user.model";

export class UserService {

    async createUser(data: CreateUserInput): Promise<UserModel> {

        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email
            },
        });
        return user as UserModel;
    }
    async findUser(id: string) {
        if (id === undefined || id === null || String(id).trim() === '') {
            throw new Error('id do usuário é obrigatório');
        }
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}