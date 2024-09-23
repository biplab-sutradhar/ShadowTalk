import moogoose, {Schema, Document, } from "mongoose";
import { string } from "zod";

export interface Messages extends Document {
    content : string;
    createdAt : Date;
    updatedAt : Date;

}

const MessageSchema : Schema<Messages> = new Schema({
    content : {type : String, required : true},
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now},
})

export interface User extends Document {
    username : string;
    email:string;
    password : string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified : boolean;
    isAcceptingMessage:boolean;
    messages : Messages[];
    createdAt : Date;
    updatedAt : Date;

}


const UserSchema : Schema<User> = new Schema({
    username : {type : String, required : true},
    email : {type : String, required : true, unique : true, match : [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"]},
    password : {type : String, required : true},
    verifyCode : {type : String, required : [true, "Verify code is required"]},
    verifyCodeExpiry : {type : Date, required : [true, "Verify code expiry is required"]},
    isVerified : {type : Boolean, required : true},
    isAcceptingMessage : {type : Boolean, required : true},
    messages : [MessageSchema],
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now},
})

const UserModel = (moogoose.models.User as moogoose.Model<User> )||  moogoose.model<User>("User", UserSchema);

export default UserModel;