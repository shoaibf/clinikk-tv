import { Application, Request, Response, NextFunction } from 'express'
import User from './user'
import Auth from './auth'

const endpoints: any [] = []

User.stack.forEach((stack, i) => {
  if (stack.route) {
    endpoints.push({
      method: stack.route.stack[0].method.toUpperCase(),
      path: stack.route.path
    })
  }
})

Auth.stack.forEach((stack, i) => {
  if (stack.route) {
    endpoints.push({
      method: stack.route.stack[0].method.toUpperCase(),
      path: stack.route.path
    })
  }
})

export default (app: Application) => {
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({ message: 'welcome to typescript-node-express boilerplate API (v1.0.0)'})
  })

  app.use('/', User)
  app.use('/', Auth)

  app.get('/endpoints', (req: Request, res: Response, next: NextFunction) => res.json(endpoints))
}