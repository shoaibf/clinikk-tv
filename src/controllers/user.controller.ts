import { Request, Response, NextFunction } from 'express'
import User, { IUser } from './../database/models/user'

interface ICreateUserInput {
  fullName: IUser['fullName']
  email: IUser['email']
  username: IUser['username']
  password: IUser['password']
}

async function CreateUserInput({
  fullName,
  email,
  username,
  password
}: ICreateUserInput): Promise<IUser> {
  return User.create({
    fullName,
    email,
    username,
    password
  })
  .then((data: IUser) => {
    return data
  })
  .catch((error: Error) => {
    throw error
  })
}

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query:any = {}
      
      if (req.query.search) {
        query['fullName'] = new RegExp(req.query.search, 'gi')
      }

      const sort:any = { 'createdAt': -1 }
      const page = req.query.page ? parseInt(req.query.page) : 1
      const limit = req.query.limit ? parseInt(req.query.limit) : 10
      const options = { page, limit, sort }
      const result = await User.paginate(query, options)

      res.json({
        message: 'fetch users',
        ...
        result
      })
    } catch (error) {
      next(error)
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await CreateUserInput({
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })
  
      res.json({
        message: 'user has been created',
        data: user
      })
    } catch (error) {
      next(error)
    }
  }
}