import {Injectable} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Session} from "@fast-fingers/entities";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SessionsService extends TypeOrmCrudService<Session> {
  constructor(@InjectRepository(Session) repo) {
    super(repo)
  }
}
