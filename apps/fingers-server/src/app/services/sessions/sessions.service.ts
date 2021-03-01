import {Injectable, UnauthorizedException} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Session, User} from "@fast-fingers/entities";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";
import {Connection} from "typeorm";

@Injectable()
export class SessionsService extends TypeOrmCrudService<Session> {
  constructor(
    @InjectRepository(Session) repo,
    private userService: UserService,
    @InjectConnection() private connection: Connection,
  ) {
    super(repo)
  }

  async onCreateSession({difficulty, token}): Promise<Session> {
    const {userId} = await this.userService.decryptToken(token)
    let user
    try {
      user = await this.userService.findOne({id: userId})
    } catch (e) {
      throw new UnauthorizedException("Invalid Token")
    }
    const newSession = new Session()
    newSession.user = user
    newSession.difficulty = difficulty
    const session = await this.connection.getRepository(Session).save(newSession)
    return session
  }
}
