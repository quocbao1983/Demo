import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ConfigEntity } from "./entities/config.entity";
@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private ConfigRepository: Repository<ConfigEntity>,
  ) {}
  async create(createConfigDto: CreateConfigDto) {
    this.ConfigRepository.create(createConfigDto);
    const result = await this.ConfigRepository.save(createConfigDto);
    return result
  }
  async findAll() {
    return await this.ConfigRepository.find();
  }
  async findOne(id: string) {
    return await this.ConfigRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.ConfigRepository.findOne({ where: { id: id } });
  }
  async update(id: string, data: Partial<UpdateConfigDto>) {
    await this.ConfigRepository.update({ id }, data);
    return await this.findOne(id);
  }
  async remove(id: string) {
    await this.ConfigRepository.delete({ id });
    return { deleted: true };
  }
} 