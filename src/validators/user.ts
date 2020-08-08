import * as Joi from '@hapi/joi'

export default {
  create: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}