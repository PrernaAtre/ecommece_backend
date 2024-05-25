import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true
})

export class User 
{
    @Prop({required : true})
    firstname : string;

    @Prop({required : true})
    lastname : string;

    @Prop({required : true, unique : true, lowercase : true})
    email : string;

    @Prop({required : true})
    password : string;

    @Prop()
    profile_image : string;

    @Prop()
    customerId : string;

    @Prop({required : true})
    role : string;

    @Prop({default : false})
    isSubcribed : boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);