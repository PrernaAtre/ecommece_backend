import { IsOptional, IsString } from "class-validator";

export class UpdateProfileDto
{
    @IsString()
    @IsOptional()
    firstname? : string;

    @IsString()
    @IsOptional()
    lastname? : string;

    @IsString()
    @IsOptional()
    profile_image? : string;
}