import mongoose, { Document } from 'mongoose'
import user from './../schema/user'

export interface IUser extends Document {
  fullName: string
  email: string
  username: string
  password: string
}

export default mongoose.model<IUser>('User', user)