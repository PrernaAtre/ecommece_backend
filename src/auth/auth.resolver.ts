import { Body, Controller, HttpException, Inject, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupInput } from './dto/signupInput.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';

@Resolver(of => UserType)
export class Authresolver {
    constructor(private authService : AuthService){}

    @Query(returns => UserType)
    users()
    {
        
    }

    @Mutation(returns => UserType)
    signUp(@Args('userSignupDto') userSignupDto : UserSignupInput)
    {
        try
        {
            return this.authService.createUser(userSignupDto);
        }
        catch(err)
        {
            if(err instanceof HttpException) throw err;
            throw new InternalServerErrorException("Something went wrong while trying to sign up.");
        }
    }   
}
