import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, salt);
    const user: User = await this.create({ email, password: hashedPassword });

    try {
      await this.save(user);
      console.log(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('User with email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
