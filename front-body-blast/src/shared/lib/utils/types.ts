import { ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from 'zod';

type ValidationFn = (...args: unknown[]) => ZodEffects<ZodTypeAny> | ZodObject<ZodRawShape> | ZodTypeAny;
type ZodInner<T extends ZodObject<ZodRawShape> | ZodTypeAny> = ReturnType<T['parse']>;
type ZodEffectsInner<T extends ZodEffects<ZodTypeAny>> = ZodInner<ReturnType<T['innerType']>>;

export type GetZodInnerType<T> = T extends ValidationFn //If provided <namespace>.validation() fn, then
  ? ReturnType<T> extends ZodEffects<ZodTypeAny> // if validation() returns ZodEffect
    ? ZodEffectsInner<ReturnType<T>> //Take its inner type
    : ReturnType<T> extends ZodObject<ZodRawShape> | ZodTypeAny //If validation returns ZodObject or ZodType
    ? ZodInner<ReturnType<T>> //Take its inner type
    : never // If validation() returns other -> never
  : never; //If T not extends Validation -> never
