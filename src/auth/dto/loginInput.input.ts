import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserLoginInput
{
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
}
