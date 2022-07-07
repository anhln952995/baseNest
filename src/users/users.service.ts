import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from '../db/models/users.model';
import { Op } from 'sequelize';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';

import { UserDetailEntity, UserEntity } from './users.entity';
import { ROLE } from 'src/common/constant';
import moment from 'moment';

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
    if (!foundUserExit.password) {
      throw new ConflictException('Your email is not actived.');
    }
    const isMatch = await bcrypt.compare(password, foundUserExit.password);
    if (!isMatch) {
      throw new ConflictException('Email or password mismatch');
    }
    const userOutput: UserDetailEntity = {
      email: foundUserExit.email,
      user_id: foundUserExit.user_id,
      full_name: foundUserExit.full_name,
      role: foundUserExit.role,
    };
    return new UserDetailEntity(userOutput);
  }

  async createUser({
    email,
    role,
    createdBy,
    organizationId,
  }: {
    email: string;
    role: string;
    createdBy: string;
    organizationId: string;
  }): Promise<UserEntity> {
    const foundUserExit = await User.findOne({
      where: { email, deleted_at: null },
    });
    if (!isEmpty(foundUserExit)) {
      throw new ConflictException('Email exited');
    }
    const userCreated = await User.create({
      email,
      role,
      created_by: createdBy,
      ...(role !== ROLE.SUPER_ADMIN && {
        organization_id: organizationId || createdBy,
      }),
    });

    const userOutput: UserEntity = {
      email: userCreated.email,
      user_id: userCreated.user_id,
      full_name: userCreated.full_name,
      role: userCreated.role,
    };
    return userOutput;
  }

  async userDetails(userId: string): Promise<UserDetailEntity> {
    const foundUser = await User.findOne({
      where: { user_id: userId, deleted_at: null },
    });
    if (isEmpty(foundUser)) {
      throw new NotFoundException('User not found');
    }
    const userOutput: UserDetailEntity = {
      email: foundUser.email,
      user_id: foundUser.user_id,
      full_name: foundUser.full_name,
      role: foundUser.role,
    };
    return new UserDetailEntity(userOutput);
  }

  async listUsers({
    search,
    limit,
    offset,
    createdBy,
  }: {
    search: string;
    limit: number;
    offset: number;
    createdBy: string;
  }): Promise<{
    data: UserEntity[];
    count: number;
  }> {
    const { rows, count } = await User.findAndCountAll({
      attributes: ['user_id', 'full_name', 'email'],
      where: {
        deleted_at: null,
        [Op.and]: [
          {
            [Op.or]: [
              { created_by: createdBy },
              { organization_id: createdBy },
            ],
          },
          {
            ...(!isEmpty(search) && {
              [Op.or]: [
                { email: { [Op.substring]: search } },
                { full_name: { [Op.substring]: search } },
              ],
            }),
          },
        ],
      },
      limit,
      offset,
      order: ['created_at'],
    });
    return { data: rows.map((i) => i['dataValues']), count };
  }

  async ActiveUser({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<UserEntity> {
    const foundUserExit = await User.findOne({
      where: { email, deleted_at: null },
    });
    if (isEmpty(foundUserExit)) {
      throw new NotFoundException('User not found');
    }
    if (foundUserExit.actived_at || foundUserExit.password) {
      throw new ConflictException('User actived');
    }
    const pass = await bcrypt.hash(password, 10);

    await foundUserExit.update(
      {
        password: pass,
        full_name: fullName,
        actived_at: new Date(),
      },
      { where: { email, deleted_at: null } },
    );

    const userOutput: UserEntity = {
      email: foundUserExit.email,
      user_id: foundUserExit.user_id,
      full_name: foundUserExit.full_name,
      role: foundUserExit.role,
    };
    return userOutput;
  }
}
