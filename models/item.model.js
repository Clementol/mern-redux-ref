const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  itemSchema = new Schema({
    name: {type: String, unique: true,
    required: [true, 'Please add name'],
    min: [3, 'Name must not be less than 3 characters']},
    date: {type: Date, required: true, default: Date.now}
},
    {
        timestamps: true
    }
)
// const Item = mongoose.model('Item', itemSchema)


// module.exports =  Item;

export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);