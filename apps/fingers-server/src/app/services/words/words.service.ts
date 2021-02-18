import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Words} from "@fast-fingers/entities";

@Injectable()
export class WordsService extends TypeOrmCrudService<Words> {
  constructor(@InjectRepository(Words) repo) {
    super(repo);
  }
}
