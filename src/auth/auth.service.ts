import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const logMessage = `AuthService :: signUp :: email - ${email}`
    this.logger.log(`${logMessage}`);
    const isUser = await this.usersRepository.findOne({
      where: { email },
    });
   
    if (isUser) {
      this.logger.error(`${logMessage} :: Email is already exist`);
      throw new UnauthorizedException('Email is already exist!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id });
    this.logger.log(`${logMessage} :: user successfully created`);
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const logMessage = `AuthService :: login :: email - ${email}`
    this.logger.log(`${logMessage}`);
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      this.logger.error(`${logMessage} :: user not found!`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      this.logger.error(`${logMessage} :: password mismatched!`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id });
    this.logger.log(`${logMessage} :: user successfully loggedin!`);
    return { token };
  }
}
