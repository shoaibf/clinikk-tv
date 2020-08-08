import { Application, Request, Response, NextFunction } from 'express'

interface IRequest extends Request {
  [key: string]: any
}

interface IResponse extends Response {
  [key: string]: any
}

export default (app: Application) => {
  app.use( (req: IRequest, res: IResponse, next: NextFunction) => {
    // TODO:  create a single global intercept res.send() = (): any => () {}
    next()
  })
}