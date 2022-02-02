import Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().email().max(255).required(),

  password: Joi.string().min(6).max(255).required(),

  firstName: Joi.string().min(2).required(),

  lastName: Joi.string().min(2).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),

  password: Joi.string().min(6).max(255).required(),
});

export const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),

  description: Joi.string().min(5).required(),

  deadline: Joi.date().required(),

  priority: Joi.string().required(),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(255),

  description: Joi.string().min(5),

  deadline: Joi.date(),

  priority: Joi.string(),
})