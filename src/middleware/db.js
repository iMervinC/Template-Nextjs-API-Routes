import mongoose from 'mongoose'

export const dbConnect = async () => {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) return

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}

export const jsonify = (obj) => {
  const result = JSON.parse(JSON.stringify(obj))
  return result
}

const dbMiddleware = async (req, res, next) => {
  try {
    if (!global.mongoose) {
      global.mongoose == dbConnect()
    }
  } catch (err) {
    console.error(err)
  }
  return next()
}

export default dbMiddleware
