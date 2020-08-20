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
    register_date: {
        type: Date,
        default: Date.now
      
    }
},
{
    timestamps: true
}
)

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

