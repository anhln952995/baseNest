export enum ROLE {
  BOSS = 'boss',
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  PUPILS = 'pupils',
}

export const ROLE_ARRAY = ['boss', 'super_admin', 'admin', 'teacher', 'pupils'];

export enum ACTION {
  MANAGE = 'MANAGER',
  READ = 'READ',
  LIST = 'LIST',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ACTIVE = 'ACTIVE',
}

export enum SUBJECT {
  USER = 'user',
  ORGANIZATION = 'organization',
}
