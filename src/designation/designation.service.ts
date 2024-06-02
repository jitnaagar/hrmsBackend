import { Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Designation from './entities/designation.entity';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Injectable()
export class DesignationService {
  private logger = new Logger();
  constructor(
    @InjectRepository(Designation)
    private designationRepository: Repository<Designation>,
  ) {}

  async create(createDesignationDto: CreateDesignationDto) {
    const { title, status } = createDesignationDto;
    const logMessage = `DesignationService :: create :: title - ${title} :: status - ${status}`;
    this.logger.log(`${logMessage}`);
    const isDesignation = await this.designationRepository.findOne({
      where: { title },
    });
   
    if (isDesignation) {
      this.logger.error(`${logMessage} :: Designation is already exist`);
      throw new UnauthorizedException('Designation is already exist!');
    }

    const newDesignation= await this.designationRepository.create({
      title,
      status,
    });

    this.logger.log(`${logMessage} :: user successfully created`);
    return await this.designationRepository.save(newDesignation);
  }

  async findAll() {
    const logMessage = `DesignationService :: Get`;
    this.logger.log(`${logMessage}`);
    const designation = await this.designationRepository.find();
    return designation;
  }

  async findOne(id: number) {
    const logMessage = `DesignationService :: Get by id`;
    this.logger.log(`${logMessage}`);
    const designation = await this.designationRepository.findOne({
      where: {
        id: id,
      },
    });
    if (designation) {
      return designation;
    }
    throw new NotFoundException('Could not find the user');
  }

  async update(id: number, updateDesignationDto: UpdateDesignationDto) {
    const { title, status } = updateDesignationDto;
    const logMessage = `DesignationService :: update :: title - ${title} :: status - ${status}`;
    this.logger.log(`${logMessage}`);
    const isDepartment = await this.designationRepository.findOne({
      where: { title },
    });
   
    if (isDepartment) {
      this.logger.error(`${logMessage} :: designation is already exist`);
      throw new UnauthorizedException('designation is already exist!');
    }
    return await this.designationRepository.update(id, updateDesignationDto);
  }

  async remove(id: number) {
    const logMessage = `DesignationService :: remove by id`;
    this.logger.log(`${logMessage}`);
    const designation = await this.designationRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!designation) {
      return null;
    }

    await this.designationRepository.remove(designation);
    return designation;
  }
}
