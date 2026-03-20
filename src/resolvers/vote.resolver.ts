import { GqlUser } from "../graphql/decorators/user.decorator";
import { VoteService } from "../services/vote.service";
import { VoteModel } from "../models/vote.model";
import { UserModel } from "../models/user.model";
import { Arg, FieldResolver, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Mutation } from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { UserService } from "../services/user.service";
import { IdeaService } from "../services/idea.service";
import { IsAuth } from "../middlewares/auth.middleware";

@Resolver(() => VoteModel)
@UseMiddleware(IsAuth)  
export class VoteResolver {

    private voteService = new VoteService
    private userService = new UserService
    private ideaService = new IdeaService

    @Mutation(() => VoteModel, { nullable: true })
    async toggleVote(
        @GqlUser() user: UserModel | null,
        @Arg("ideaId", () => String) ideaId: string,
    ): Promise<VoteModel | null> {
        if (!user) throw new Error("Usuário não encontrado.");
        return this.voteService.toggleVote(user.id, ideaId);
    }

    @Query(() => [VoteModel])
    async listVotesByIdea(
        @Arg("ideaId", () => String) ideaId: string,
    ): Promise<VoteModel[]> {
        return this.voteService.listVotesByIdea(ideaId);
    }

    @FieldResolver(() => IdeaModel)
    async idea(@Root() vote: VoteModel): Promise<IdeaModel> {
        const row = await this.voteService.findById(vote.id);
        return this.ideaService.getIdea(row.ideaId);
    }

    @FieldResolver(() => UserModel)
    async user(@Root() vote: VoteModel): Promise<UserModel> {
        const row = await this.voteService.findById(vote.id);
        return this.userService.findUser(row.userId);
    }
}       