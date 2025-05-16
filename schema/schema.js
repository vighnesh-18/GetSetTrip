const Joi= require('joi');

module.exports.listingSchema=Joi.object({
        title: Joi.string().required().min(3).max(60),
        description: Joi.string().required().min(5).max(200),
        image: Joi.string().allow("",null),
        price: Joi.number().required().min(500),
        location: Joi.string().required(),
        country: Joi.string().required()
});