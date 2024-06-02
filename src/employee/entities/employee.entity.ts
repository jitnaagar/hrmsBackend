import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    userId: number;

    @Column({ nullable: true })
    departmentId: number;

    @Column({ nullable: true })
    designationId: number;

    @Column({ unique: true, nullable: true })
    employeeCode: string;
  
    @Column({ nullable: true })
    EmployeeId: string
  
    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    dob: Date;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    hireDate: Date;
  
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    salary: number;

    @Column({ nullable: true })
    totalLeaves: number;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    fatherName: string;

    @Column({ nullable: true })
    motherName: string;

    @Column({ nullable: true })
    MaritalStatus: string;

    @Column({ nullable: true })
    picture: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
  
  }
  
  export default Employee;
  