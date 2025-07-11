import joi from "joi";

export const userValidationSchema = joi.object({
  name: joi.string().min(4).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(100).required().alphanum()  
});

