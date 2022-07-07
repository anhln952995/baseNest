import Sequelize from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  })
  user_id: string;

  @Column({ allowNull: false })
  email: string;

  @Column
  password: string;

  @Column
  full_name: string;

  @Column
  role: string;

  @Column
  created_by: string;

  @Column
  organization_id: string;

  @Column({
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  created_at: Date;

  @Column
  actived_at: Date;

  @Column
  deleted_at: Date;

  @Column({ defaultValue: false })
  need_reset_password: boolean;
}
