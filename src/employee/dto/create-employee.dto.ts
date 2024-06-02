import { IsEmail, IsNotEmpty, IsString, isNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsOptional()
  userId: number;

  @IsOptional()
  EmployeeId: string;

  @IsNotEmpty()
  departmentId: number;

  @IsNotEmpty()
  designationId: number;

  @IsNotEmpty()
  firstName: string;  

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  fatherName: string;

  @IsNotEmpty()
  motherName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  dob: Date;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  hireDate: Date;

  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  totalLeaves: number;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  MaritalStatus: string;

  @IsNotEmpty()
  picture: string;

}

