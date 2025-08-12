import Joi from 'joi';

// ID 驗證規則
export const idSchema = Joi.number().integer().positive().required().messages({
  'number.base': 'ID must be a number',
  'number.integer': 'ID must be a number', 
  'number.positive': 'ID must be a number',
  'any.required': 'ID must be a number'
});