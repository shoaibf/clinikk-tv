import { Schema } from 'mongoose'
import { mongoosePagination } from 'ts-mongoose-pagination'

const user: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { collection: 'user', timestamps: true })

user.plugin(mongoosePagination)

export default user