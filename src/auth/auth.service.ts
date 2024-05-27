import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { UserSignupInput } from './dto/signupInput.input';
import { ServerError } from 'src/common/utils/serverError';
import { BcryptService } from 'src/common/utils/bcrypt.service';
import { UserLoginInput } from './dto/loginInput.input';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly bcryptService: BcryptService
    ) { }

    async createUser(userSignupDto: UserSignupInput) {
        try {
            const { firstname, lastname, email, password, role } = userSignupDto;
            const checkEmail = await this.userModel.findOne({ email });

            if (checkEmail) {
                throw new ServerError({
                    message: "alredy exist",
                    code: 409
                })
            }
            const hashedPassword = await this.bcryptService.hash(password)
            const newUser = await this.userModel.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role
            })

            return newUser;
        }
        catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException("something went wrong while trying to signup");
        }
    }


    async loginUser(userLoginInput: UserLoginInput) {
        try {
            const { email, password } = userLoginInput;
            const user = await this.userModel.findOne({ email: email }, { _id: 1, firstname: 1, lastname: 1, email: 1, role: 1, password: 1, isSubcribed: 1 }).lean();

            if (user && (await this.bcryptService.compare(password, user.password)) && user.role == userLoginInput.role) {

                const token = this.jwtService.sign({ id: user._id });
                const { password, ...userWithoutPassword } = user;
                console.log({ token, user: userWithoutPassword });
                return {
                    token,
                    firstname: userWithoutPassword.firstname,
                    lastname: userWithoutPassword.lastname,
                    email: userWithoutPassword.email,
                    role: userWithoutPassword.role,
                    profile_image: userWithoutPassword.profile_image,
                    customerId: userWithoutPassword.customerId,
                    isSubcribed: userWithoutPassword.isSubcribed
                }
            }
            throw new ServerError({
                message: "Invalid email or password.",
                code: 400,
            });
        }
        catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(
                "Something went wrong while trying to log in user."
            );
        }
    }

    verifyToken(token: string): string | object {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            ) as jwt.JwtPayload;

            if (!decoded || !decoded.id) {
                throw new ServerError({ code: 400, message: 'Invalid token' })
            }

            return decoded;
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }
    }
}
