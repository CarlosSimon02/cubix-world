import { ZodError } from "zod";

type FieldErrors = {
  [x: string]: string[] | undefined;
};

const getValidationErrors = (error: unknown): FieldErrors | undefined => {
  if (error instanceof ZodError) {
    return error.flatten().fieldErrors;
  }
  return undefined;
};

export default getValidationErrors;
