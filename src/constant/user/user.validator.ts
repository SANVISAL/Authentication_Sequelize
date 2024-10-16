import Joi from "joi";

export const userSchema = {
  userName: Joi.string().required().label("Name"),
  gender: Joi.string().required().label("Gender"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
  // roleId: Joi.number().optional().label("Role ID"),
};

export const createUserSchema = Joi.object({
  ...userSchema,
}).options({ allowUnknown: true });

export const updateUserSchema = Joi.object({
  ...userSchema,
}).options({ allowUnknown: true });
