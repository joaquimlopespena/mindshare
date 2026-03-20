import { prisma } from '../../prisma/prisma'
import { CreateCommentInput } from '../dtos/input/comment.input'

export class CommentService {
  async create(ideaId: string, userId: string, data: CreateCommentInput) {
    const findIdea = await prisma.idea.findUnique({
      where: {
        id: ideaId,
      },
    })
    if (!findIdea) throw new Error('Ideia não encontrada.')
    return prisma.comment.create({
      data: {
        ideaId,
        userId,
        content: data.content,
      },
    })
  }

  async listCommentsByIdea(ideaId: string) {
    return prisma.comment.findMany({
      where: {
        ideaId,
      },
    })
  }

  /** Garante userId/ideaId mesmo se o objeto do @Root() vier incompleto no GraphQL */
  async findById(id: string) {
    if (id === undefined || id === null || String(id).trim() === '') {
      throw new Error('id do comentário é obrigatório')
    }
    return prisma.comment.findUniqueOrThrow({
      where: { id },
    })
  }
}