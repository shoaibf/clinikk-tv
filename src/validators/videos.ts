import * as Joi from '@hapi/joi'

export default {
  
  video: Joi.object().keys({
    title: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.string().required(),
    description: Joi.string().required()
  })
}