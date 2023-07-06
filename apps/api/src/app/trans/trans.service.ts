import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransDto } from './dto/create-trans.dto';
import { UpdateTransDto } from './dto/update-trans.dto';
import { TransEntity } from "./entities/trans.entity";
@Injectable()
export class TransService {
  constructor(
    @InjectRepository(TransEntity)
    private TransRepository: Repository<TransEntity>,
  ) {}
  async create(createTransDto: CreateTransDto) {
    this.TransRepository.create(createTransDto);
    const result = await this.TransRepository.save(createTransDto);
    return result
  }
  async findAll() {
    return await this.TransRepository.find();
  }
  async findOne(id: string) {
    return await this.TransRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.TransRepository.findOne({ where: { id: id } });
  }
  async update(id: string, data: Partial<UpdateTransDto>) {
    await this.TransRepository.update({ id }, data);
    return await this.findOne(id);
  }
  async remove(id: string) {
    await this.TransRepository.delete({ id });
    return { deleted: true };
  }
} 