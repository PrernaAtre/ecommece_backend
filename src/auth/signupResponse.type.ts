import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('SignupResponse')
export class SignupResponseType {
    @Field(type => String)
    message: string;
}
