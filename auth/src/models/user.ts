import mongoose from 'mongoose'
import {Password} from '../services/password'
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

userSchema.pre('save', async function (done) { //middleware to rehash password
    if (this.isModified('password')) { // only rehash when password changed or new user
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (atrrs: UserAttrs) => {
    return new User(atrrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};
