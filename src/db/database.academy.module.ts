import { Module } from '@nestjs/common';
import { databaseAcademy } from './database.academy';

@Module({
  providers: [...databaseAcademy],
  exports: [...databaseAcademy],
})
export class DatabaseModule {}
