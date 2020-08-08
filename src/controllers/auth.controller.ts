import { Request, Response, NextFunction } from 'express'

export default {
  login: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        message: 'fetch users',
        user: {}
      })
    } catch (error) {
      next(error)
    }
  }
}