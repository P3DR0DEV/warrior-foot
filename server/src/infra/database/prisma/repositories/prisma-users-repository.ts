import type { UsersRepository } from "#domain/warrior-foot/application/repositories/users-repository.ts";
import type { User } from "#domain/warrior-foot/enterprise/entities/user.ts";
import type { PrismaClient } from "#prisma/index.d.ts";
import { PrismaUsersMapper } from "../mappers/prisma-users-mapper.ts";


export class PrismaUsersRepository implements UsersRepository {
  private prisma: PrismaClient
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }  

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUsersMapper.toPersistence(user)
    
    await this.prisma.user.create({
      data,
    })
  }
}