import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserSignupInput
{
    @Field()
    @IsString()
    @IsNotEmpty()
    firstname : string;

    @Field()
    @IsString()
    @IsNotEmpty()
    lastname : string;

    @Field()
    @IsString()
    @IsNotEmpty()
    email : string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password : string;

    @Field()
    @IsString()
    @IsNotEmpty()
    role : string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    profile_image : string;
}
