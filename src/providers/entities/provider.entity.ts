import { Bill } from "src/bills/entities/bill.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    name: string

    @Column('boolean', {
        default: true
    })
    status: boolean

    @BeforeInsert()
    lowerCaseName(){
        this.name = this.name.toLowerCase()
    }

    @OneToMany( () => Bill, (bill) => bill.provider) 
    bill:Bill[]; 

}
