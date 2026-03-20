import type { Vote } from '@prisma/client'
import { prisma } from '../../prisma/prisma'

export class VoteService {
  /** Remove o voto → `null`. Cria o voto → registro (para o GraphQL poder resolver `idea` / `user`). */
  async toggleVote(userId: string, ideaId: string): Promise<Vote | null> {
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    })

    if (existingVote) {
      await prisma.vote.delete({
        where: {
          userId_ideaId: {
            userId,
            ideaId,
          },
        },
      })
      return null
    }

    return prisma.vote.create({
      data: {
        userId,
        ideaId,
      },
    })
  }

  async listVotesByIdea(ideaId: string) {
    return prisma.vote.findMany({
      where: {
        ideaId,
      },
    })
  }

  async countVotes(ideaId: string) {
    return prisma.vote.count({
      where: {
        ideaId,
      },
    })
  }

  /** Garante userId/ideaId mesmo se o objeto do @Root() vier incompleto no GraphQL */
  async findById(id: string) {
    if (id === undefined || id === null || String(id).trim() === '') {
      throw new Error('id do voto é obrigatório')
    }
    return prisma.vote.findUniqueOrThrow({
      where: { id },
    })
  }
}