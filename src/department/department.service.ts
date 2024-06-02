import { Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Department from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  private logger = new Logger();
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const { title, status } = createDepartmentDto;
    const logMessage = `DepartmentService :: create :: title - ${title} :: status - ${status}`;
    this.logger.log(`${logMessage}`);
    const isDepartment = await this.departmentRepository.findOne({
      where: { title },
    });
   
    if (isDepartment) {
      this.logger.error(`${logMessage} :: Department is already exist`);
      throw new UnauthorizedException('Department is already exist!');
    }

    const newDepartment = await this.departmentRepository.create({
      title,
      status,
    });

    this.logger.log(`${logMessage} :: department successfully created`);
    return await this.departmentRepository.save(newDepartment);
  }

  async findAll() {
    const logMessage = `DepartmentService :: Get`;
    this.logger.log(`${logMessage}`);
    const department = await this.departmentRepository.find();
    return department;
  }

  async findOne(id: number) {
    const logMessage = `DepartmentService :: Get by id`;
    this.logger.log(`${logMessage}`);
    const department = await this.departmentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (department) {
      return department;
    }
    throw new NotFoundException('Could not find the user');
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const { title, status } = updateDepartmentDto;
    const logMessage = `DepartmentService :: update :: title - ${title} :: status - ${status}`;
    this.logger.log(`${logMessage}`);
    const isDepartment = await this.departmentRepository.findOne({
      where: { title },
    });
   
    if (isDepartment) {
      this.logger.error(`${logMessage} :: Department is already exist`);
      throw new UnauthorizedException('Department is already exist!');
    }
    return await this.departmentRepository.update(id, updateDepartmentDto);
  }

  async remove(id: number) {
    const logMessage = `DepartmentService :: remove by id`;
    this.logger.log(`${logMessage}`);
    const department = await this.departmentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!department) {
      return null;
    }

    await this.departmentRepository.remove(department);
    return department;
  }
}
