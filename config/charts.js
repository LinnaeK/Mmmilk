
const db = mongoose.connection

db.on('connected', function() {
    console.log(`Connected to MongoDb at ${db.host}:${db.port}`)
})