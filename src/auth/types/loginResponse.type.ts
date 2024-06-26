import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType('loginResponse')
export class LoginReponseType
{
    @Field(type => String)
    _id : String

    @Field(type => String)
    firstname : string;

    @Field(type => String)
    lastname : string;

    @Field(type => String)
    email : string;

    @Field(type => String)
    role : string;

    @Field(type => String)
    profile_image : string;

    @Field(type => String)
    customerId : string;

    @Field(type => String)
    isSubcribed : string;

    @Field(type => String)
    token : string;
}