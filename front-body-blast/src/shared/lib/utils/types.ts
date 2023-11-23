import { ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from 'zod';

type ValidationFn = (...args: unknown[]) => ZodEffects<ZodTypeAny> | ZodObject<ZodRawShape> | ZodTypeAny;
type ZodInner<T extends ZodObject<ZodRawShape> | ZodTypeAny> = ReturnType<T['parse']>;
type ZodEffectsInner<T extends ZodEffects<ZodTypeAny>> = ZodInner<ReturnType<T['innerType']>>;

export type GetZodInnerType<T> = T extends ValidationFn
  ? GetValidationVnInnerType<T> //If provided <namespace>.validation() fn, then get its inner
  : T extends ZodEffects<ZodTypeAny>
  ? ZodEffectsInner<T> // if provided ZodEffects - take its inner
  : T extends ZodObject<ZodRawShape> | ZodTypeAny
  ? ZodInner<T> // if provided ZodObject or ZodTypeAny - take its inner
  : never;

type GetValidationVnInnerType<T extends ValidationFn> = ReturnType<T> extends ZodEffects<ZodTypeAny>
  ? ZodEffectsInner<ReturnType<T>> // if validation() returns ZodEffect, take its inner type
  : ReturnType<T> extends ZodObject<ZodRawShape> | ZodTypeAny //If validation returns ZodObject or ZodType
  ? ZodInner<ReturnType<T>> //Take its inner type
  : never; // If validation() returns other -> never
