import mongoose from 'mongoose';
require('dotenv').config()

export default async () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }).then( () => console.log('connected to database') )
  .catch(err => console.log(`err => ${err}`))
  
};
