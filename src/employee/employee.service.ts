import { Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import {v4 as uuidv4} from 'uuid';
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
    const myuuid = `EMP-${uuidv4()}`;
    newEmployee.employeeCode = myuuid
    await this.employeeRepository.save(newEmployee);
    return newEmployee;
  }

  async findAll() {
    const logMessage = `EmployeeService :: Get`;
    this.logger.log(`${logMessage}`);
    const employee = await this.employeeRepository.find();
    return employee;
  }

  async findOne(id: number) {
    const logMessage = `EmployeeService :: Get by id`;
    this.logger.log(`${logMessage}`);
    const employee = await this.employeeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (employee) {
      return employee;
    }
    throw new NotFoundException('Could not find the employee');
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { email } = updateEmployeeDto;
    const logMessage = `EmployeeService :: update`;
    this.logger.log(`${logMessage}`);
    const isEmployee = await this.employeeRepository.findOne({
      where: { email, id: Not(id) },
    });
   
    if (isEmployee) {
      this.logger.error(`${logMessage} :: email is already exist`);
      throw new UnauthorizedException('email is already exist!');
    }
    return await this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: number) {
    const logMessage = `EmployeeService :: remove by id`;
    this.logger.log(`${logMessage}`);
    const employee = await this.employeeRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!employee) {
      return null;
    }

    await this.employeeRepository.remove(employee);
    return employee;
  }
}
