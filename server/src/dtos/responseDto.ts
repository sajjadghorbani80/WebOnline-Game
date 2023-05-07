/* eslint-disable linebreak-style */

import { Result, ValidationError } from "express-validator";

/* eslint-disable require-jsdoc */
export interface ResponseDto {
  result : object;
  errors : string | Result<ValidationError>;
}

