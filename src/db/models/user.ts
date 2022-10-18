import mongoose, {Schema, model, Model, HydratedDocument, Types} from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' ; 
import { IUser, IUserMethods } from "../../interfaces/db/index";
import { UserModel } from "../../interfaces/db/user";



// creating user Schema
const userSchema : Schema<IUser, UserModel, IUserMethods> = new Schema<IUser, UserModel, IUserMethods>({
    email: {type: String, 
        required: true, 
        trim: true, 
        lowercase:true, 
        validate(value: string) {
            if(!validator.isEmail(value)) {
                throw new Error("Please provide a valid email!!!")
            }
        }, 
        unique: true},
    password: {
        type: String, 
        required: true,
        trim: true,
        minlength:7,
        validate(value: string){
            if(value.toLowerCase().includes("password")) {
                throw new Error('Password should not contain "password"')
            }
        }},
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }],
    savedList: {
        type: [String],
        default: [],
    },
    totalCost: {
        type: Number,
        default: 0,
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps:true
})

// schema Virtuals
userSchema.virtual('expenditure', {
    ref: 'expenditure',
    localField: '_id',
    foreignField: 'owner'
});
// User methods 

// method for generating auth tokens for a user 
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    console.log(token);
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
} 

userSchema.statics.findByCredentials = async (email, password) => {
    console.log(email)
    const user  = await User.findOne({email})

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = model<IUser,UserModel>('User', userSchema);

export {User}
