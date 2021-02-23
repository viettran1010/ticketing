import mongoose from 'mongoose'

interface UserAttrs {
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

const User = mongoose.model('User', userSchema);

const buildUser = (atrrs: UserAttrs) => {
    return new User(atrrs)
}

export {User, buildUser};
