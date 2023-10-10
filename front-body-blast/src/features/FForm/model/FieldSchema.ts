import { Schema } from 'zod';
import { SInputProps } from 'shared/ui/SInput';

export interface FieldSchema {
    title: string;
    name: string;
    rule: Schema;
    sInputOptions?: Omit<SInputProps, 'title' | 'name' | 'modelValue'>;
  }
  
export type FieldsSchema = FieldSchema[];