import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
