import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';

@Module({
  controllers: [BillsController],
  providers: [BillsService],
  imports: [TypeOrmModule.forFeature([Bill])],
})
export class BillsModule {}
