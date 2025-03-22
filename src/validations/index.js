import Joi from "joi";

export const uuidSchema = () =>
  Joi.string().uuid().required().messages({
    "string.base": "ID must be a string",
    "string.uuid": "Please provide a valid UUID",
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  });

export const usernameSchema = () =>
  Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be less than 30 characters",
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  });

export const fullnameValidation = () =>
  Joi.string().min(3).max(50).allow("").messages({
    "string.base": "Full name must be a string",
    "string.min": "Full name must be at least 3 characters long",
    "string.max": "Full name must be less than 50 characters",
  });

export const passwordSchema = () =>
  Joi.string().min(6).max(30).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be less than 30 characters",
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  });

export const rePasswordSchema = () =>
  Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Please confirm your password",
    "string.empty": "RePassword cannot be empty",
  });

export const emailValidation = () =>
  Joi.string().email().min(3).max(30).required().messages({
    "string.base": "Email must be a string",
    "string.email": "Please provide a valid email address",
    "string.min": "Email must be at least 3 characters long",
    "string.max": "Email must be less than 30 characters",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  });

export const verificationCode = () =>
  Joi.string().min(6).max(6).required().messages({
    "string.base": "Code must be a string",
    "string.min": "Code must be at least 6 characters long",
    "string.max": "Code must be less than 6 characters",
    "any.required": "Code is required",
    "string.empty": "Code cannot be empty",
  });
