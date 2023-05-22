import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Provider } from 'src/providers/entities/provider.entity';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class BillsService {

  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(Provider)
    private readonly providerRespository: Repository<Provider> 
  ){} 

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const { number_bill, provider, price, pay } = createBillDto

    let providerFind: Provider 

    try {
      providerFind = await this.providerRespository.findOne({ where: {name: provider}})  
    } catch (error) {
      this.handleDBExceptions(error);
    }
    
    if (!providerFind) {
      providerFind = new Provider();
      providerFind.name = provider;
      try {
        await this.providerRespository.save(providerFind)  
      } catch (error) {
        this.handleDBExceptions(error);
      }
    } 

    const bill = new Bill();
    bill.number_bill = number_bill;
    bill.provider = providerFind;
    bill.price = price;
    bill.pending_debt = price;
    console.log('Provider found')

    try {
      await this.billRepository.save(bill);
      return bill  
    } catch (error) {
      this.handleDBExceptions(error);
    } 
  }

  async findAll( paginationDto:PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto
    try {
      const bills = await this.billRepository.find({
        take: limit,
        skip: offset,
      });
      return bills
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(term: string) {
    let bill:Bill
    try {
      if (isUUID(term)) {
        bill = await this.billRepository.findOneBy({ id: term});
      } else {
        const queryBuilder = this.billRepository.createQueryBuilder('bill');
        bill = await queryBuilder
          .where('UPPER(name) =:name', {
            name: term.toUpperCase()
          })
          .getOne()
      }
      this.notFoundBill(bill)
      return bill;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
   
    const{ provider, ...restUpdateBillDto} = updateBillDto

    try {
      const bill = await this.billRepository.preload({
        id,
        ...restUpdateBillDto
      })
  
      this.notFoundBill(bill);
      await this.billRepository.save(bill)
      return bill  
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const bill = await this.findOne(id);
    await this.billRepository.remove(bill)
    return `Bill delete id ${id} delete of BD`
  }

  private handleDBExceptions(error: any) {
    throw new BadRequestException(error.detail);
  }

  private notFoundBill(bill: Bill) {
    if (!bill || bill === undefined) throw new NotFoundException(`Bill not found`);
  }

}

