import { Op } from 'sequelize';
import { UnauthorizedException } from '@nestjs/common';

import { ROLE, ACTION, SUBJECT } from './constant';
import { User } from '../db/models/users.model';

const getAllowedResources = async (
  userId: string,
  organizationId: string,
  roles: string[],
): Promise<{ userIds: string[] }> => {
  const getAllUsers = await User.findAll({
    where: {
      deleted_at: null,
      [Op.or]: [
        {
          role: { [Op.in]: roles },
          created_by: userId,
          organization_id: organizationId || { [Op.ne]: null },
        },
        { user_id: userId },
      ],
    },
  });
  const userIds = getAllUsers.map((item) => item.user_id);
  return { userIds };
};

export const ability = async ({
  role,
  action,
  subject,
  userId,
  organizationId,
  object,
}: {
  role: string;
  action: string;
  subject: string;
  userId: string;
  organizationId: string;
  object?: string;
}) => {
  // check ability role admin
  if (role === ROLE.ADMIN) {
    if (subject === SUBJECT.USER) {
      const { userIds } = await getAllowedResources(userId, organizationId, [
        ROLE.TEACHER,
        ROLE.PUPILS,
      ]);
      if (object && !userIds.includes(object)) {
        throw new UnauthorizedException();
      }
    }
  }
  // check ability role teacher
  if (role === ROLE.TEACHER) {
    if (subject == SUBJECT.USER) {
      const { userIds } = await getAllowedResources(userId, organizationId, [
        ROLE.PUPILS,
      ]);

      if (object && !userIds.includes(object)) {
        throw new UnauthorizedException();
      }
    }
  }
  // check ability role pupils
  if (role === ROLE.PUPILS) {
    if (subject == SUBJECT.USER) {
      const listActions: string[] = [ACTION.ACTIVE, ACTION.UPDATE, ACTION.READ];
      if (!listActions.includes(action)) {
        throw new UnauthorizedException();
      }
    }
  }
};
