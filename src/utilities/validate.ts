import Joi, { SchemaLike, Types } from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import ValidationError from './errors/Validation'

interface IRequest extends Request {
  [key: string]: any
}

export default (schema: SchemaLike, type?: Types, config?: any) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    let dataType: any = type || 'body'
    let joiConfig = Object.assign({ abortEarly: false, allowUnknown: true }, config)
    let { error } = Joi.validate(req[dataType], schema, joiConfig)
    
    if (error) {
      throw new ValidationError(error.details)
    }

    next()
  }
}

