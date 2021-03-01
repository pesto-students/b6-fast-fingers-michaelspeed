import {Injectable} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {Scores} from "@fast-fingers/entities";
import {Connection} from "typeorm";

@Injectable()
export class ScoresService extends TypeOrmCrudService<Scores> {
  constructor(
    @InjectRepository(Scores) repo,
    @InjectConnection() private connection: Connection,
  ) {
    super(repo);
  }

  async getMyScores(data): Promise<Scores[]> {
    return this.connection.getRepository(Scores).find({where:{user:{id: data.userId}}, order: {score: 'DESC'}, take: data.take, relations: ['session', 'session.words']})
  }
}
