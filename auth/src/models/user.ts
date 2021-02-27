import mongoose from 'mongoose'
import { version } from 'typescript';
import {Password} from '../services/password'
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
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
}, {
    toJSON: { // overwrite JSON.stringify
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;            
            delete ret.__v;
        }        
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
