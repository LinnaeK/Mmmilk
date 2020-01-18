
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

mongoose.connection.on('connected', function(err, db) {
  if(err) throw new Error(err)
    console.log(`Connected to MongoDB at ${process.env.DATABASE_URL}`)
})

module.exports = mongoose