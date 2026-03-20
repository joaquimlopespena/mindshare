import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql'
import { UserModel } from './user.model'
import { IdeaModel } from './idea.model'

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  content!: string

  @Field(() => String)
  userId!: string

  @Field(() => String)
  ideaId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => IdeaModel, { nullable: true })
  idea?: IdeaModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}