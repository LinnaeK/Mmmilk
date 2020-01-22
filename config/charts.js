
const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://linnae:testing3@cluster0-vvyen.mongodb.net/mmmilk?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

mongoose.connection.on('connected', function(err, db) {
  if(err) throw new Error(err)
    console.log(`Connected to MongoDB at ${process.env.DATABASE_URL}`)
})

module.exports = mongoose