import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";
import { IdeaModel } from "../models/idea.model";
import { UserModel } from "../models/user.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { IdeaService } from "../services/idea.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { UserService } from "../services/user.service";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
    private ideaService = new IdeaService
    private userService = new UserService

    @Mutation(() => IdeaModel)
    async createIdea(
        @GqlUser() user: UserModel | null,
        @Arg("data", () => CreateIdeaInput) data: CreateIdeaInput,
    ): Promise<IdeaModel> {
        if (!user) throw new Error("Usuário não encontrado.");
        const idea = await this.ideaService.createIdea(data, user.id);
        return idea;
    }

    @Query(() => [IdeaModel])
    async listIdeas(): Promise<IdeaModel[]> {
        return await this.ideaService.listIdeas();
    }

    @Query(() => IdeaModel)
    async getIdea(@Arg("id", () => String) id: string): Promise<IdeaModel> {
        return await this.ideaService.getIdea(id);
    }

    @Mutation(() => IdeaModel)
    async updateIdea(@Arg("id", () => String) id: string, @Arg("data", () => UpdateIdeaInput) data: UpdateIdeaInput): Promise<IdeaModel> {
        return await this.ideaService.updateIdea(id, data);
    }

    @Mutation(() => IdeaModel)
    async deleteIdea(@Arg("id", () => String) id: string): Promise<IdeaModel> {
        return await this.ideaService.deleteIdea(id);
    }

    @FieldResolver(() => UserModel)
    async user(@Root() idea: IdeaModel): Promise<UserModel> {
        const row = await this.ideaService.findIdeaById(idea.id);
        if (!row) throw new Error('Ideia não encontrada');
        return await this.userService.findUser(row.userId);
    }
}