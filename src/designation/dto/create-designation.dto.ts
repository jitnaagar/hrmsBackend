import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateDesignationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

