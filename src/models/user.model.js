import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
          userName:{
            type: String,
            required: true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
          },
          email:{
            type: String,
            required: true,
            unique : true,
            lowercase : true,
            trim : true,
          },
          fullName:{
            type: String,
            required: true,
            trim : true,
            index : true
          },
          avatar: {
            type : String, //cloudinary url
            required : true
          },
          coverImage: {
            type : String, //cloudinary url
          },
          watchHistory :[
            {
                type : Schema.Types.ObjectId,
                ref: "Video"
            }
          ],
          password: {
            type : String,
            required: [true,"Password is required!"]
          },
          refreshToken :{
            type : String
          }


    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(next){
   if(!this.isModified("password")) next();  // only bcrypt when password is change 

    this.password = bcrypt.hash(this.password);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password);
}

userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            userName : this.userName,
            email : this.email,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User",userSchema);