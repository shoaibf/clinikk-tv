import mongoose from 'mongoose'

export default (database: string) => {
  const connect = () => {
    mongoose
      .connect(
        database,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
      )
      .then(() => {
        return console.info(`Successfully connecting to database ${database}`)
      })
      .catch(error => {
        console.error('Error connecting to database: ', error)
        return process.exit(1)
      })
  }

  connect()
  
  mongoose.connection.on('error', error => console.log(`Error connection database ${error}`))
  mongoose.connection.on('disconnected', connect)
}