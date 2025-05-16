const Joi= require('joi');

module.exports.listingSchemaForUpdate=Joi.object({
        description: Joi.string().required().min(5).max(200),
        price: Joi.number().required().min(500)
});