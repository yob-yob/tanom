import { z } from 'zod';
declare type allKeys<T> = T extends any ? keyof T : never;

export class ValidationMessageBag<F extends z.ZodType<any, any, any>> {
  public error: z.ZodError;
  public flat: z.inferFlattenedErrors<F>;
  public format: z.inferFormattedError<F>;
  public hasErrors = false;

  constructor(error: z.ZodError) {
    this.error = error;
    this.hasErrors = this.error.issues.length > 0;
    this.flat = this.error.flatten() as z.inferFlattenedErrors<F>
    this.format = this.error.format() as z.inferFormattedError<F>
  }
  
  public get(validation_key: allKeys<z.output<F>>) {
    return this.flat.fieldErrors[validation_key];
  }

  public has(validation_key: string) {
    return this.flat.fieldErrors ? Object.keys(this.flat.fieldErrors).includes(validation_key) : false;
  }

  public static fromZodIssues<F extends z.ZodType<any, any, any>>(issues: z.ZodIssue[] = []) {
    return new ValidationMessageBag<F>(new z.ZodError(issues))
  }
}