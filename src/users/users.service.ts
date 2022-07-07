import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from '../db/models/users.model';
import { Op } from 'sequelize';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';

import { UserDetailEntity } from './users.entity';

@Injectable()
export class UsersService {
  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserDetailEntity> {
    const foundUserExit = await User.findOne({
      where: { email, deleted_at: null },
    });
    if (isEmpty(foundUserExit)) {
      throw new NotFoundException('User not found');
    }
    const hash = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new ConflictException('Email or password mismatch');
    }
    const userOutput: UserDetailEntity = {
      email: foundUserExit.email,
      user_id: foundUserExit.user_id,
      full_name: foundUserExit.full_name,
    };
    return new UserDetailEntity(userOutput);
  }
  async createUser({
    email,
    password,
    role,
    fullName,
  }: {
    email: string;
    password: string;
    role: string;
    fullName?: string;
  }): Promise<UserDetailEntity> {
    const foundUserExit = await User.findOne({
      where: { email, deleted_at: null },
    });
    if (!isEmpty(foundUserExit)) {
      throw new ConflictException('Email exited');
    }
    const pass = await bcrypt.hash(password, 10);
    const userCreated = await User.create({
      email,
      password: pass,
      role,
      full_name: fullName,
    });

    const userOutput: UserDetailEntity = {
      email: userCreated.email,
      user_id: userCreated.user_id,
      full_name: userCreated.full_name,
    };
    return new UserDetailEntity(userOutput);
  }
}
