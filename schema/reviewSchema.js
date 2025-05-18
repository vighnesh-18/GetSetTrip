const Joi= require('joi');

module.exports.reviewSchema=Joi.object({
        name: Joi.string().required().min(3).max(20),
        comment: Joi.string().required().min(5).max(200),
        rating: Joi.number().required().min(1).max(5)
});