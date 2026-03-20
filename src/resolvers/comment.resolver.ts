import { CommentModel } from "../models/comment.model"
import { CommentService } from "../services/comment.service"
import { FieldResolver, Mutation, Query, Resolver, UseMiddleware, Root } from "type-graphql"
import { Arg } from "type-graphql"
import { CreateCommentInput } from "../dtos/input/comment.input"
import { IsAuth } from "../middlewares/auth.middleware"
import { GqlUser } from "../graphql/decorators/user.decorator"
import { UserModel } from "../models/user.model"
import { IdeaService } from "../services/idea.service"
import { UserService } from "../services/user.service"
import { IdeaModel } from "../models/idea.model"

@Resolver(() => CommentModel)
@UseMiddleware(IsAuth)  
export class CommentResolver {
    private commentService = new CommentService
    private userService = new UserService
    private ideaService = new IdeaService

    @Mutation(() => CommentModel)
    async createComment(
        @GqlUser() user: UserModel | null,
        @Arg("ideaId", () => String) ideaId: string,
        @Arg("data", () => CreateCommentInput) data: CreateCommentInput,
    ): Promise<CommentModel> {
        if (!user) throw new Error("Usuário não encontrado.");
        return this.commentService.create(ideaId, user.id, data);
    }

    @Query(() => [CommentModel])
    async listCommentsByIdea(
        @Arg("ideaId", () => String) ideaId: string,
    ): Promise<CommentModel[]> {
        return this.commentService.listCommentsByIdea(ideaId)
    }

    @FieldResolver(() => UserModel)
    async user(@Root() comment: CommentModel): Promise<UserModel> {
        const row = await this.commentService.findById(comment.id);
        return this.userService.findUser(row.userId);
    }

    @FieldResolver(() => IdeaModel)
    async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
        const row = await this.commentService.findById(comment.id);
        return this.ideaService.getIdea(row.ideaId);
    }
}