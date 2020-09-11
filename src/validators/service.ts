import * as Joi from '@hapi/joi'

export default {
    create: Joi.object().keys({
      serviceName: Joi.string().required(),
      serviceDisplayName: Joi.string().max(35).required(),
      category: Joi.string().required(),
      serviceType: Joi.string(),
      description: Joi.string(),
      contentLink: Joi.string().uri(),
      icon: Joi.string().uri(),
      meta: Joi.string()
    })
}