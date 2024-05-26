import { Body, Controller, HttpException, Inject, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupInput } from './dto/signupInput.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserLoginInput } from './dto/loginInput.input';
import { LoginReponseType } from './types/loginResponse.type';

@Resolver(of => UserType)
export class AuthResolver {
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
    
    @Mutation(returns => LoginReponseType)
    login(@Args('loginUserInput') userLoginInput : UserLoginInput)
    {
        try
        {
            console.log("userLoginInput---in resolver", userLoginInput);
            return this.authService.loginUser(userLoginInput);
        }
        catch(error)
        {
            if(error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Something went wrong while trying to sign in.");
        }
    }
}
