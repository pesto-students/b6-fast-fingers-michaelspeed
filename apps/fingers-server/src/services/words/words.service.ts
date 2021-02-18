import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Words} from "../../database";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class WordsService extends TypeOrmCrudService<Words> {
  constructor(@InjectRepository(Words) repo) {
    super(repo);
  }
}
