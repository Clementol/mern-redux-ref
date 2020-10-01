import * as  mongoose from 'mongoose';
const Schema = mongoose.Schema;



const ResetPasswordTokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now }
}, {timestamps: true} )
ResetPasswordTokenSchema.index({createdAt: 1}, {expires: 600})

export const ResetPasswordToken = mongoose.models.ResetPassword || mongoose.model('ResetPassword', ResetPasswordTokenSchema)
