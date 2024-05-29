import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/auth/user.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{name : 'User', schema : User }])
  ],
  providers: [CloudinaryService],
  exports : [CloudinaryService]
})
export class CloudinaryModule {}
