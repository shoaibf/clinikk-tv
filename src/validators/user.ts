import * as Joi from '@hapi/joi'

export default {
  register: Joi.object().keys({
    email: Joi.string().required(),
    mobile: Joi.string().length(10).required(),
    password: Joi.string().min(3).required(),
    otp: Joi.string().required()
  }),
  create: Joi.object().keys({
    email: Joi.string(),
    mobile: Joi.string().length(10)
  })
}