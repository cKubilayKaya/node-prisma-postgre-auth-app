import Joi from "joi";

export const usernameSchema = () =>
  Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be less than 30 characters",
    "any.required": "Username is required",
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
  });

export const emailValidation = () =>
  Joi.string().email().min(3).max(30).required().messages({
    "string.base": "Email must be a string",
    "string.email": "Please provide a valid email address",
    "string.min": "Full name must be at least 3 characters long",
    "string.max": "Full name must be less than 30 characters",
    "any.required": "Email is required",
  });
export const emailVerificationCode = () =>
  Joi.string().min(6).max(6).required().messages({
    "string.base": "Email Verification Code must be a string",
    "string.min": "Full name must be at least 6 characters long",
    "string.max": "Full name must be less than 6 characters",
    "any.required": "Email Verification Code is required",
  });
