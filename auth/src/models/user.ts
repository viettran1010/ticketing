import mongoose from 'mongoose'

interface UserAttrs {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }    
});

userSchema.statics.build = (atrrs: UserAttrs) => {
    return new User(atrrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};
