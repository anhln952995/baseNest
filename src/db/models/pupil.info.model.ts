import Sequelize from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class PupilInfo extends Model<PupilInfo> {
  @Column({
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: Sequelize.UUID,
  })
  user_id: string;

  @Column({ allowNull: false })
  object: string;

  @Column
  value: string;
}
