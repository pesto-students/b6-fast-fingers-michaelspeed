import {Injectable, OnModuleInit} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Words} from "@fast-fingers/entities";
import data from "./dictionary.json";
import {Connection} from "typeorm";

@Injectable()
export class WordsService extends TypeOrmCrudService<Words> implements OnModuleInit {
  constructor(
    @InjectRepository(Words) repo,
    @InjectConnection() private connection: Connection,
  ) {
    super(repo);
  }

  onModuleInit() {
    this.InitWords()
  }

  async InitWords() {
    for (const word of data) {
      const newWord = new Words();
      newWord.word = word
      newWord.length = word.length
      await this.connection.getRepository(Words).save(newWord);
    }
  }
}
