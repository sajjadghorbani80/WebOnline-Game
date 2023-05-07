import { Result, ValidationError } from "express-validator";

/* eslint-disable require-jsdoc */
export interface ResponseDto<Type> {
  result: Type;
  errors: string | Result<ValidationError>;
}

