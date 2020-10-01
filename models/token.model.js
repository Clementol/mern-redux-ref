import * as  mongoose from 'mongoose';
const Schema = mongoose.Schema;



const TokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now }
}, {timestamps: true} )
TokenSchema.index({createdAt: 1}, {expires: 600})

export const Token = mongoose.models.Token || mongoose.model('Token', TokenSchema)
