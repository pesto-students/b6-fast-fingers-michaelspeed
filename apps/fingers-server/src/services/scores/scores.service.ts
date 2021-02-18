import {Injectable} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Scores} from "../../database";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ScoresService extends TypeOrmCrudService<Scores> {
  constructor(@InjectRepository(Scores) repo) {
    super(repo);
  }
}
