import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports : [
    MongooseModule.forFeature([{name : 'User', schema: UserSchema}]), AuthModule, CloudinaryModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
