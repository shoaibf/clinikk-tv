import * as Joi from '@hapi/joi'

export default {
  register: Joi.object().keys({
    email: Joi.string().required(),
    fullname: Joi.string().required(),
    password: Joi.string().min(3).required()
  }),
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}