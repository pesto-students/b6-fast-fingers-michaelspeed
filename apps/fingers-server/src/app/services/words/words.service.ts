import {Injectable, UnauthorizedException} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {DifficultyEnum, Session, Words} from "@fast-fingers/entities";
import {Connection} from "typeorm";

@Injectable()
export class WordsService extends TypeOrmCrudService<Words> {
  constructor(
    @InjectRepository(Words) repo,
    @InjectConnection() private connection: Connection,
  ) {
    super(repo);
  }

  async getWords(sessionId): Promise<Words[]> {
    let session: Session;
    try {
      session = await this.connection.getRepository(Session).findOne({where: {id: sessionId}, relations: ['words']})
    } catch(e) {
      throw new UnauthorizedException("Session is not valid")
    }
    const qb = this.connection.getRepository(Words)
      .createQueryBuilder('words')

    if (session.difficulty === DifficultyEnum.EASY) {
      qb.where('words.length BETWEEN 0 AND 4')
    } else if (session.difficulty === DifficultyEnum.MEDIUM) {
      qb.where('words.length BETWEEN 5 AND 8')
    } else {
      qb.where('words.length > 8')
    }

     if (session.words && session.words.length > 0) {
       qb.andWhere('words.id NOT IN (:...ids)', {ids: session.words.map(i => i.id)})
     }
     qb.orderBy("RAND()")
    qb.limit(5)

    const words: Words[] = await qb.getMany()

    if (session.words && session.words.length > 0) {
      session.words = [...session.words, ...words]
    } else {
      session.words = [...words]
    }
    await this.connection.getRepository(Session).save(session)
    return session.words
  }

}
