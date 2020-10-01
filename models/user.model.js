import * as  mongoose from 'mongoose';
const Schema = mongoose.Schema;

// const TokenSchema = new Schema({
//     userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
//     token: {type: String, required: true},
//     createAt: {type: Date, required: true, default: Date.now, expires: 300}
// })

const UserSchema = new Schema({
    name: {
        type: String,
        required: true   
    },
    email: {
        type: String, unique: true,
        required: true   
    },
    password: {
        type: String, 
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false 
    },
    items: []
},

    {
        timestamps: true
    }
)

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
