import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { CurrentUser } from 'src/common/utils/commonType';
import { ServerError } from 'src/common/utils/serverError';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private cloudinaryService : CloudinaryService
    ) { }

    async update(imagePath: string, updateProfileDto: UpdateProfileDto, currentUser: CurrentUser) {
        try {
            const { firstname, lastname, profile_image } = updateProfileDto;
            const user = await this.userModel.findById(currentUser.id);
            if (!user) {
                throw new ServerError({ message: "User not found", code: 400 });
            }
            const image_url = await this.cloudinaryService.uploadProfileImage(imagePath);
            user.profile_image = image_url?.url;
            const updated_user = await this.userModel.findByIdAndUpdate(currentUser.id,{
                firstname,
                lastname,
                profile_image
            },{new : true, projection : {firstname : 1, lastname : 1, profile_image : 1}});
            return updated_user;
        }
        catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(
                "Something went wrong while trying to update profile."
              );
        }
    }
}
