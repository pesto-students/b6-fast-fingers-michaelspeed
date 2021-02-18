import {Injectable} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Scores} from "@fast-fingers/entities";

@Injectable()
export class ScoresService extends TypeOrmCrudService<Scores> {
  constructor(@InjectRepository(Scores) repo) {
    super(repo);
  }
}
