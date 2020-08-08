import { Application, Request, Response, NextFunction } from 'express'
import ValidationsError from './Validation'

interface IError extends Error {
  status?: number
  message: string
}

export default (app: Application) => {
  app.use( (req, res, next) => {
    const err: IError = new Error('Not Found')
    err.status = 404
    next(err)
  })
  
  app.use( (err: IError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err)
    }

    if (err instanceof ValidationsError) {
      console.log(' \n==================================================================================')
      console.log('Validation Error \nDate: ' + new Date())
      console.log('----------------------------------------------------------------------------------')
      const response: any = { message: err.getMessage() }
      response.errors = err.getData()
      console.log('Errors: ', response.errors)
      console.log(' ')
      console.log('Request Body:', req.body)
      console.log('----------------------------------------------------------------------------------')
      return res.status(err.getStatus()).json(response)
    }

    res.status(err.status || 500)
    res.json({errors: {
      message: err.message,
      error: err
    }})
  })
}