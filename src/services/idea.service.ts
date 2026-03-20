import { prisma } from '../../prisma/prisma'
import { CreateIdeaInput, UpdateIdeaInput } from '../dtos/input/idea.input'
import { IdeaModel } from '../models/idea.model'

function assertNonEmptyId(
  id: string | undefined | null,
  label = 'id',
): asserts id is string {
  if (id === undefined || id === null || String(id).trim() === '') {
    throw new Error(`${label} é obrigatório`)
  }
}

export class IdeaService {
  async createIdea(data: CreateIdeaInput, userId: string): Promise<IdeaModel> {
    return prisma.idea.create({
      data: {
        title: data.title,
        description: data.description,
        userId,
      },
    })
  }

  async listIdeas() {
    return prisma.idea.findMany()
  }

  async deleteIdea(id: string) {
    assertNonEmptyId(id, 'id da ideia')
    const findIdea = await prisma.idea.findUnique({
      where: {
        id,
      },
    })
    if (!findIdea) throw new Error('Ideia não encontrada')
    return prisma.idea.delete({
      where: {
        id,
      },
    })
  }

  async findIdeaById(id: string) {
    assertNonEmptyId(id, 'id da ideia')
    return prisma.idea.findUnique({
      where: {
        id,
      },
    })
  }

  async getIdea(id: string) {
    const idea = await prisma.idea.findUnique({
      where: {
        id,
      },
    })

    if (!idea) throw new Error('Ideia não encontrada')

    return idea
  }

  async updateIdea(id: string, data: UpdateIdeaInput) {
    assertNonEmptyId(id, 'id da ideia')
    const idea = await prisma.idea.findUnique({
      where: {
        id,
      },
    })

    if (!idea) throw new Error('Ideia não encontrada')

    return prisma.idea.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
      },
    })
  }
}