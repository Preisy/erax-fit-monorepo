import { ApiProperty } from "@nestjs/swagger";
import { FormEntity } from "../entities/form.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { DeepPartialDateType } from '../../form/types/deep-partial-date.type'
import { 
  IsDefined,
  IsDate,
  IsNumber
 } from "class-validator";

export class CreateFormRequest{
  @IsDefined()  
  @ApiProperty()
  public user: UserEntity;

  @IsDefined()
  @IsDate()
  @ApiProperty()
  public date: DeepPartialDateType;
  
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public weight: number;
  
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public waist: number;
  
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public abdomen: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public shoulder: number;
  
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public hip: number;
  
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public hipVolume: number;

  constructor(
    user: UserEntity,
    date: DeepPartialDateType,
    weight: number,
    waist: number,
    abdomen: number,
    shoulder: number,
    hip: number,
    hipVolume: number,
    ){
    this.user = user;
    this.date = date;
    this.weight = weight;
    this.waist = waist;
    this.shoulder = shoulder;
    this.abdomen = abdomen;
    this.hip = hip;
    this.hipVolume = hipVolume;
  }

}

export class CreateFormResponse {
  @ApiProperty({ type: FormEntity })
  public form: FormEntity;
  
  constructor(form: FormEntity) {
    this.form = form;
  }
}