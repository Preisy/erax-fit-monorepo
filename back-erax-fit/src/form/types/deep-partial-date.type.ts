import { DeepPartial } from "typeorm";

interface DateType{
    date: Date;
}

export type DeepPartialDateType = DeepPartial<DateType>;