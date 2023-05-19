import { addDays } from 'date-fns';
import {
  AfterUpdate,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
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

  @Column('text')
  provider: string;

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

  @Column('boolean', {
    default: true,
  })
  status: boolean;

  @BeforeInsert()
  setDate() {
    this.date_programing_pay = addDays(new Date(), 30);
  }

  @AfterUpdate()
  async handlePayUpdate() {
    if (this.pay === this.price) {
      this.date_done_pay = new Date();
      this.price = this.price - this.pay;
    }
  }
}
