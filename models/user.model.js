import * as  mongoose from 'mongoose';
const Schema = mongoose.Schema;


//     name: {type: String, trim: true},
//     date: {type: Date, default: Date.now}


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
    // register_date: {
    //     type: Date,
    //     default: Date.now
      
    // },
    items: []
},

    {
        timestamps: true
    }
)

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
// export const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema)

