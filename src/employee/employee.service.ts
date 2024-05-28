import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  private logger = new Logger();
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const logMessage = `EmployeeService`;
    const { email } = createEmployeeDto;
    const isEmployee = await this.employeeRepository.findOne({
      where: { email },
    });
   
    if (isEmployee) {
      this.logger.error(`${logMessage} :: Email is already exist`);
      throw new UnauthorizedException('Email is already exist!');
    }
    const newEmployee = await this.employeeRepository.create(createEmployeeDto);
    await this.employeeRepository.save({
      name: createEmployeeDto.name,
      email: createEmployeeDto.email,
    });
    return newEmployee;
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
