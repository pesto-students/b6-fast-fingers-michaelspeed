import {Injectable} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {User} from "../../database";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo)
  }
}
