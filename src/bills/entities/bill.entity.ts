import { HttpException, HttpStatus } from '@nestjs/common';
import { addDays } from 'date-fns';
import { Provider } from 'src/providers/entities/provider.entity';
import {
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date_input: Date;

  @CreateDateColumn()
  date_programing_pay: Date;

  @Column('text')
  number_bill: string;

  @Column('int', {
    default: 0,
  })
  price: number;

  @Column({ nullable: true, type: 'date' })
  date_done_pay: Date;

  @Column('int', {
    default: 0,
  })
  pay: number;

  @Column('int', {
    default: 0,
  })
  pending_debt: number;

  @Column('boolean', {
    default: true,
  })
  status: boolean;

  @ManyToOne( () => Provider, ( provider ) => provider.name, {
    cascade: true,
  })
  provider: Provider

  @BeforeInsert()
  setDate() {
    this.date_programing_pay = addDays(new Date(), 30);
  }

  @BeforeUpdate()
  updateDates() {
    if (this.pending_debt < this.pay || this.status === false) {
      throw new HttpException(`The pay can't maior to price`, HttpStatus.BAD_REQUEST)
    } 
    this.pending_debt = this.pending_debt - this.pay;   
    if (this.pending_debt === 0) {
      this.status = false;
      this.date_done_pay = new Date();
    }}}

