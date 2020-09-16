import * as  mongoose from 'mongoose';
const Schema = mongoose.Schema;


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
// export const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema)

