import { Body, Controller, Injectable, Put, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { Authenticationrequest } from 'src/common/utils/commonType';
import { ServerError } from 'src/common/utils/serverError';


@Controller('user')
export class UserController {
    constructor(
       private  userService: UserService
    ) { }

    @Put()
    @UseGuards(AuthGuard)
    async updateProfile(@Body() updateProfileDto: UpdateProfileDto,
        @UploadedFile() profile_image: Express.Multer.File,
        @Req() { currentUser }: Authenticationrequest): Promise<Object> {
            console.log("current user in update profile controller-------", currentUser);
            
        if (!profile_image) {
            throw new ServerError({ message: "No file uploaded", code: 400 });
        }
        return this.userService.update(profile_image.path, updateProfileDto, currentUser);
    }
}
