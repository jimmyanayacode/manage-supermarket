import { Bill } from "src/bills/entities/bill.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//Represents Provider table 
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

    //Before create a provider its name value is transform to lowercase
    @BeforeInsert()
    lowerCaseName(){
        this.name = this.name.toLowerCase()
    }

    //Define relations with Bill entity one provider can have many bills
    @OneToMany( () => Bill, (bill) => bill.provider) 
    bill:Bill[]; 

}
